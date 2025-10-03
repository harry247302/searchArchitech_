// architech controller

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { client } = require("../config/client");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const { log } = require("console");


const signUp = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);

    const {
      first_name,
      last_name,
      category,
      price,
      phone_number,
      email,
      password_hash,
      street_address,
      apartment,
      city,
      postal_code,
      company_name,
      gst_no,
      state_name,
      payment_status,
      timings,
      website_link,
    } = req.body;

    // 🔹 Validate required fields
    if (!email || !password_hash || !first_name || !last_name) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // 🔹 Check if email already exists
    const userCheck = await client.query(
      "SELECT * FROM architech WHERE email = $1",
      [email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 🔹 Hash password
    const hashPassword = await bcrypt.hash(password_hash, 10);

    // 🔹 Helper: Upload single file to Cloudinary
    const uploadFile = async (file, folder, type = "image") => {
      if (!file) return null;
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder,
          resource_type: type,
        });
        fs.unlink(file.path, () => {}); // delete local file
        return result.secure_url;
      } catch (err) {
        console.error(`Cloudinary upload failed [${folder}]:`, err);
        return null;
      }
    };

    // 🔹 Upload files
    const profile_url = req.files?.profile_url?.[0]
      ? await uploadFile(req.files.profile_url[0], "profiles")
      : null;

    const company_brochure_url = req.files?.company_brochure_url?.[0]
      ? await uploadFile(req.files.company_brochure_url[0], "brochures")
      : null;

    const catalog_photos = req.files?.catalog_photos?.length
      ? await Promise.all(req.files.catalog_photos.map((f) => uploadFile(f, "catalog")))
      : [];

    const adhar_photos = req.files?.adhar_photos?.length
      ? await Promise.all(req.files.adhar_photos.map((f) => uploadFile(f, "adhar")))
      : [];

    const pan_card_photos = req.files?.pan_card_photos?.length
      ? await Promise.all(req.files.pan_card_photos.map((f) => uploadFile(f, "pan")))
      : [];

    const videos = req.files?.videos?.length
      ? await Promise.all(req.files.videos.map((f) => uploadFile(f, "videos", "video")))
      : [];

    // 🔹 Insert user into DB
    const insertQuery = `
      INSERT INTO architech (
        first_name, last_name, category, price, phone_number, email, password_hash,
        street_address, apartment, city, postal_code, company_name, gst_no, state_name,
        profile_url, company_brochure_url, payment_status, timings,
        catalog_photos, adhar_photos, pan_card_photos,
        website_link, videos
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,
        $8,$9,$10,$11,$12,$13,$14,
        $15,$16,$17,$18,
        $19,$20,$21,
        $22,$23
      ) RETURNING *;
    `;
const values = [
  first_name,
  last_name,
  category || null,
  price || null,
  phone_number || null,
  email,
  hashPassword,
  street_address || null,
  apartment || null,
  city || null,
  postal_code || null,
  company_name || null,
  gst_no || null,
  state_name || null,
  profile_url,
  company_brochure_url,
  payment_status || "no",
  JSON.stringify(timings || { days: [], slots: [{ open: "", close: "" }] }),
  catalog_photos.length ? catalog_photos : null,  // <- pass array or null
  adhar_photos.length ? adhar_photos : null,
  pan_card_photos.length ? pan_card_photos : null,
  website_link || null,
  videos.length ? videos : null
];


    const newUser = await client.query(insertQuery, values);

    return res.status(201).json({
      message: "Registered successfully",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error.stack || error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};




const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userResult = await client.query(
      "SELECT * FROM architech WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).send("User not found");
    }

    const user = userResult.rows[0];

    if (user.active_status === "no") {
      return res
        .status(403)
        .send({ success: false, message: "You are under verfication" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res
        .status(401)
        .send({ success: false, message: "Incorrect password!" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, uuid: user.uuid },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(token, "|||||||||||||||||||||||||||||||||||||||||");

    res.cookie("architectToken", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });





    res.status(200).json({
      message: "Login successful",

      user: {
        id: user.id,
        category: user.category,
        price: user.price,
        phone_number: user.phone_number,
        apartment: user.apartment,
        postal_code: user.postal_code,
        company_name: user.company_name,
        gst_no: user.gst_no,
        profile_url: user.profile_url,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        uuid: user.uuid,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
    res.status(500).send("Login error");
  }
};

// const logout = async (req, res) => {
//   try {
//     const token = req.cookies?.architectToken || req.cookies?.token || req.cookies?.visitorToken;

//     if (token) {
//       // Optionally, you can verify the token here
//       jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//           console.log("Token verification failed:", err);
//         } else {
//           console.log("Token verified successfully:", decoded);
//         }
//       });
//     }
//     res.clearCookie("architectToken");
//     res.status(200).json({ message: "Logout successful" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Logout error");
//   }
// };

// const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
  try {
    // Step 1: Debug incoming cookies
    console.log("Received cookies:", req.cookies);

    // Step 2: Get token from cookies
    const token =
      req.cookies?.architectToken ||
      req.cookies?.token ||
      req.cookies?.visitorToken;

    console.log("Logout token:", token);

    // Step 3: Verify token (optional)
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified:", decoded);
      } catch (err) {
        console.log("Token verification failed:", err.message);
      }
    }

    // Step 4: Define cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // or set to true temporarily for testing
      sameSite: "strict",
      path: "/",
    };

    // Step 5: Clear all expected cookies
    const cookiesToClear = ["architectToken", "token", "visitorToken"];
    cookiesToClear.forEach((cookie) => {
      console.log(`Clearing cookie: ${cookie}`);
      res.clearCookie(cookie, cookieOptions);
    });

    // Step 6: Return response
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).send("Logout error");
  }
};

module.exports = {
  signUp,
  login,
  logout,
};

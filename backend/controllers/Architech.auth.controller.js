// architech controller

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { client } = require("../config/client");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const { log } = require("console");

const signUp = async (req, res) => {
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
    opening_time,
    closing_time,
    start_weekday,
    open_weekday,
    website_link,
  } = req.body;

  console.log("FILES:", req.files);
  try {
    const userCheck = await client.query(
      "SELECT * FROM architech WHERE email = $1",
      [email]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password_hash, salt);

    let profile_url = "";
    let company_brochure_url = "";
    let catalog_photos = [];
    let adhar_photos = [];
    let pan_card_photos = [];
    let videos = [];

    if (req.files?.profile_url?.[0]) {
      const profileResult = await cloudinary.uploader.upload(
        req.files.profile_url[0].path,
        { folder: "uploads" }
      );
      profile_url = profileResult.secure_url;
      fs.unlinkSync(req.files.profile_url[0].path);
    }

    if (req.files?.company_brochure_url?.[0]) {
      const brochureResult = await cloudinary.uploader.upload(
        req.files.company_brochure_url[0].path,
        { folder: "uploads" }
      );
      company_brochure_url = brochureResult.secure_url;
      fs.unlinkSync(req.files.company_brochure_url[0].path);
    }

    if (req.files?.catalog_photos?.length) {
      for (const file of req.files.catalog_photos) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "catalog",
        });
        catalog_photos.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }


    if (req.files?.adhar_photos?.length) {
      for (const file of req.files.adhar_photos) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "adhar",
        });
        adhar_photos.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    // Upload PAN card photo
    if (req.files?.pan_card_photos?.length) {
      for (const file of req.files.pan_card_photos) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "pan",
        });
        pan_card_photos.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    if (req.files?.videos?.length) {
      for (const file of req.files.videos) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "videos",
          resource_type: "video", // important for videos
        });
        videos.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    const newUser = await client.query(
      `INSERT INTO architech (
        first_name, last_name, category, price, phone_number, email, password_hash,
        street_address, apartment, city, postal_code, company_name, gst_no, state_name,
        profile_url, company_brochure_url, payment_status, opening_time, closing_time,
        start_weekday, open_weekday, catalog_photos, adhar_photos, pan_card_photos,
        website_link, videos
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,
        $8,$9,$10,$11,$12,$13,$14,
        $15,$16,$17,$18,$19,$20,
        $21,$22,$23,$24,$25,$26
      ) RETURNING *`,
      [
        first_name,
        last_name,
        category,
        price,
        phone_number,
        email,
        hashPassword,
        street_address,
        apartment,
        city,
        postal_code,
        company_name,
        gst_no,
        state_name,
        profile_url,
        company_brochure_url,
        payment_status || "no",
        opening_time || null,
        closing_time || null,
        start_weekday || null,
        open_weekday || null,
        catalog_photos,
        adhar_photos,
        pan_card_photos,
        website_link || null,
        videos,
      ]
    );

    const user = newUser.rows[0];

    res.status(201).json({
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
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
    console.log(token,"|||||||||||||||||||||||||||||||||||||||||");
    
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

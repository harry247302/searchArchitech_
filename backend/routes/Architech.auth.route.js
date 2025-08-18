const express = require("express");
const { signUp, login, logout } = require("../controllers/Architech.auth.controller");
const multer = require("multer");
const { protect } = require("../middleware/Auth.middleware");
const upload = multer({ dest: "uploads/" });
const authRouter = express.Router();

authRouter
  .post("/login", login)
  .post(
    "/sign-up",
    upload.fields([
      { name: "profile_url", maxCount: 1 },
    { name: "company_brochure_url", maxCount: 1 },
    { name: "catalog_photos", maxCount: 10 },  // multiple catalog photos
    { name: "adhar_photos", maxCount: 2 },     // Aadhaar front + back
    { name: "pan_card_photos", maxCount: 1 },  // PAN card
    { name: "videos", maxCount: 5 },           // multiple videos
    ]),
    signUp
  )
  .post("/logout", logout);

module.exports = authRouter;

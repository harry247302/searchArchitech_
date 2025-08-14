const express = require("express");
const {
  submitFeedback,
  getFeedbackByArchitect,
  getFeedback,
} = require("../controllers/Feedback.controller");
const { protect } = require("../middleware/Auth.middleware");
const feedback_router = express.Router();

feedback_router.post("/submit", submitFeedback);
feedback_router.get("/getFeedback", protect, getFeedbackByArchitect);
feedback_router.get("/getFeedback/:uuid", getFeedback);

module.exports = feedback_router;

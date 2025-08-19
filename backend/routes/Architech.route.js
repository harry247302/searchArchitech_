const express = require("express");
const multer = require("multer");
const {
  update_architech_by_id,
  fetch_next_architech,
  fetch_previous_architech,
  filter_architechs,
  getArchitectById,
  fetch_all_architech,
  delete_multiple_architechs,
  fetch_architech_by_pagination,
  getArchitectProfileById,
  dynamic_architech_data,
  get_architect_filter_options,
} = require("../controllers/Architect.controllers");
const { protect } = require("../middleware/Auth.middleware");
const upload = multer({ dest: "uploads/" });

const architech_router = express.Router();

architech_router.get("/fetchById", protect, getArchitectById);
architech_router.get("/fetchProfileById/:uuid", getArchitectProfileById);
architech_router.get("/fetchByPagination", fetch_architech_by_pagination);
architech_router.get("/fetchAll", fetch_all_architech);
architech_router.get("/get_architect_filter_options",get_architect_filter_options)
architech_router.post("/delete-multiple", protect, delete_multiple_architechs);
architech_router.put(
  "/update",
  upload.fields([
    { name: "profile_url", maxCount: 1 },
    { name: "company_brochure_url", maxCount: 1 },
  ]),
  protect,
  update_architech_by_id
);
architech_router.get("/dynamic_architech", dynamic_architech_data);
// architech_router.get('/fetchArchitect/previous_page',protect,fetch_previous_architech)
architech_router.get("/filter", filter_architechs);

module.exports = architech_router;

const express = require("express");
const lead_router = express.Router();

const { createLead, getLeadsByArchitect, deleteLead , getLeadsByVisitor } = require("../controllers/Leads.controllers");

lead_router.post("/", createLead);

lead_router.get("fetchByArchitect/:architech_uuid", getLeadsByArchitect);

lead_router.get("/fetchByVisitor/:visitor_uuid", getLeadsByVisitor);

lead_router.delete("/:id", deleteLead);

module.exports = lead_router;

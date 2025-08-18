const { client } = require("../config/client");

const createLead = async (req, res) => {
  const { visitor_uuid, architech_uuid, message, project_type, budget_range } = req.body;

  if (!visitor_uuid || !architech_uuid) {
    return res.status(400).json({ message: "visitor_uuid and architech_uuid are required" });
  }

  try {
    const result = await client.query(
      `INSERT INTO leads (
        visitor_uuid, architech_uuid, message, project_type, budget_range
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [visitor_uuid, architech_uuid, message || null, project_type || null, budget_range || null]
    );

    res.status(201).json({
      message: "Lead created successfully",
      lead: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

// ✅ Fetch Leads by Architect UUID
const getLeadsByArchitect = async (req, res) => {
  const { architech_uuid } = req.params;

  try {
    const result = await client.query(
      `SELECT l.*, v.fullname, v.email, v.phone_number
       FROM leads l
       JOIN visitors v ON l.visitor_uuid = v.visitoruuid
       WHERE l.architech_uuid = $1
       ORDER BY l.created_at DESC`,
      [architech_uuid]
    );

    res.status(200).json({
      message: "Leads fetched successfully",
      leads: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

// ✅ Delete Lead by ID
const deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      `DELETE FROM leads WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({
      message: "Lead deleted successfully",
      deletedLead: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

// ✅ Fetch Leads by Visitor UUID
const getLeadsByVisitor = async (req, res) => {
  const { visitor_uuid } = req.params;

  try {
    const result = await client.query(
      `SELECT l.*, a.first_name, a.last_name, a.company_name, a.category
       FROM leads l
       JOIN architech a ON l.architech_uuid = a.uuid
       WHERE l.visitor_uuid = $1
       ORDER BY l.created_at DESC`,
      [visitor_uuid]
    );

    res.status(200).json({
      message: "Leads fetched successfully",
      leads: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


module.exports = {
  createLead,
  getLeadsByVisitor,
  getLeadsByArchitect,
  deleteLead,
};

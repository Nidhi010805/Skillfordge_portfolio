const pool = require("../config/db");

// GET certifications for the logged-in user
exports.getCertifications = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, link FROM certifications WHERE user_id = $1",
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching certifications:", err.message);
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
};

// ADD a new certification
exports.addCertification = async (req, res) => {
  const { title, link } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO certifications (user_id, title, link) VALUES ($1, $2, $3) RETURNING id",
      [req.userId, title, link]
    );
    res.json({
      message: "Certification added successfully",
      certification: {
        id: result.rows[0].id,
        title,
        link,
      },
    });
  } catch (err) {
    console.error("Error adding certification:", err.message);
    res.status(500).json({ error: "Failed to add certification" });
  }
};

// DELETE a certification for the logged-in user
exports.deleteCertification = async (req, res) => {
  const certId = req.params.id;
  try {
    const result = await pool.query(
      "DELETE FROM certifications WHERE id = $1 AND user_id = $2",
      [certId, req.userId]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Certification not found or unauthorized" });
    }
    res.json({ message: "Certification deleted successfully" });
  } catch (err) {
    console.error("Error deleting certification:", err.message);
    res.status(500).json({ error: "Failed to delete certification" });
  }
};

const pool = require("../config/db");

// GET all projects for the logged-in user
// GET all projects for the logged-in user
exports.getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects WHERE user_id = $1 ORDER BY position ASC",
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching projects:", err.message);
    res.status(500).send("Error fetching projects");
  }
};


// ADD a new project
// ADD a new project
exports.addProject = async (req, res) => {
  const { name, description, tech, link } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT COALESCE(MAX(position), -1) + 1 AS new_position FROM projects WHERE user_id = $1",
      [req.userId]
    );
    const newPosition = rows[0].new_position;

    const insertResult = await pool.query(
      `INSERT INTO projects (user_id, name, description, tech, link, position)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.userId, name, description, tech, link, newPosition]
    );

    res.status(201).json(insertResult.rows[0]); // ✅ send full project
  } catch (err) {
    console.error("Error adding project:", err.message);
    res.status(500).send("Error adding project");
  }
};

// REORDER projects
exports.reorderProjects = async (req, res) => {
  const reorderedProjects = req.body; // [{ id, position }]
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const project of reorderedProjects) {
      await client.query(
        "UPDATE projects SET position = $1 WHERE id = $2 AND user_id = $3",
        [project.position, project.id, req.userId]
      );
    }

    await client.query("COMMIT");
    res.json({ message: "Projects reordered successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error reordering projects:", err.message);
    res.status(500).json({ message: "Failed to reorder projects" });
  } finally {
    client.release();
  }
};


// DELETE a project for the logged-in user
exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 AND user_id = $2",
      [projectId, req.userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Project not found or you don't have permission" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err.message);
    res.status(500).send("Error deleting project");
  }
};

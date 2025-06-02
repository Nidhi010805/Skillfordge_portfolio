const pool = require("../config/db");

// GET all skills for logged-in user
exports.getSkills = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, skill FROM skills WHERE user_id = $1', [req.userId]);
    res.json({ skills: result.rows });
  } catch (err) {
    console.error('Error fetching skills:', err.message);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

// ADD a new skill for the logged-in user
exports.addSkill = async (req, res) => {
  const { skill } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO skills(user_id, skill) VALUES($1, $2) RETURNING id',
      [req.userId, skill]
    );
    res.json({ msg: 'Skill added successfully', skillId: result.rows[0].id });
  } catch (err) {
    console.error("Error adding skill:", err.message);
    res.status(500).json({ error: 'Failed to add skill' });
  }
};

// REMOVE a skill for the logged-in user
exports.removeSkill = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM skills WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Skill not found or you don\'t have permission' });
    }
    res.json({ msg: 'Skill removed successfully' });
  } catch (err) {
    console.error("Error removing skill:", err.message);
    res.status(500).json({ error: 'Failed to remove skill' });
  }
};

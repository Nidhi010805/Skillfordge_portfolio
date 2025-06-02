const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Get user by id
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    // Get skills (array of skill strings)
    const skillsResult = await pool.query('SELECT skill FROM skills WHERE user_id = $1', [user.id]);
    const skills = skillsResult.rows.map(row => row.skill);

    // Get projects with tech
    const projectsResult = await pool.query(
      'SELECT name AS title, description, link, tech FROM projects WHERE user_id = $1',
      [user.id]
    );
    const projects = projectsResult.rows;

    // Get certifications
    const certsResult = await pool.query(
      'SELECT title, link FROM certifications WHERE user_id = $1',
      [user.id]
    );
    const certifications = certsResult.rows;

    // Send all data as response
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      profile_pic: user.profile_pic,
      resume: user.resume,
      skills,
      projects,
      certifications,
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

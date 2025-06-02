// models/userModel.js
const pool = require('../config/db');

// Get user by username
const getUserByUsername = async (username) => {
  const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return res.rows[0];
};

// Update user profile (bio, skills, certifications)
const updateProfile = async (userId, bio, skills) => {
  const res = await pool.query(
    'UPDATE users SET bio = $1, skills = $2 WHERE id = $3 RETURNING bio, skills',
    [bio, skills, userId]
  );
  return res.rows[0];
};

module.exports = { getUserByUsername, updateProfile };

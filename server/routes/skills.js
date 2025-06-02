const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addSkill, removeSkill, getSkills } = require('../controllers/skillsController');

router.get('/', auth, getSkills);  // Add this line
router.post('/', auth, addSkill);
router.delete('/:id', auth, removeSkill);

module.exports = router;


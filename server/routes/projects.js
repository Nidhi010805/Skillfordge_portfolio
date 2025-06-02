const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getProjects,
  addProject,
  deleteProject,
  reorderProjects,  // ← ye import add karo
} = require("../controllers/projectsController");

router.get("/", auth, getProjects);
router.post("/", auth, addProject);
router.delete("/:id", auth, deleteProject);
router.put("/reorder", auth, reorderProjects);  // ← ye naya route add karo

module.exports = router;

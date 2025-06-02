const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getCertifications,
  addCertification,
  deleteCertification,
} = require("../controllers/certificationsController");

router.get("/", auth, getCertifications);
router.post("/", auth, addCertification);
router.delete("/:id", auth, deleteCertification);

module.exports = router;

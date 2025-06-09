const pool = require("../config/db");
const multer = require("multer");

// Multer in memory storage to get file buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadMiddleware = upload.fields([
  { name: "profile_pic", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);
///hi

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const profile = result.rows[0];

    // These are already base64 strings stored in DB
    const profilePicBase64 = profile.profile_pic || null;
    const resumeBase64 = profile.resume || null;

    res.status(200).json({
      ...profile,
      profile_pic: profilePicBase64,
      resume: resumeBase64,
    });
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { bio, remove_profile_pic, remove_resume } = req.body;

    let profilePicBase64 = null;
    let resumeBase64 = null;

    if (req.files) {
      if (req.files["profile_pic"]) {
        // convert buffer to base64 string
        profilePicBase64 = req.files["profile_pic"][0].buffer.toString("base64");
      }
      if (req.files["resume"]) {
        resumeBase64 = req.files["resume"][0].buffer.toString("base64");
      }
    }

    // Fetch existing profile
    const existing = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updatedProfilePic =
      remove_profile_pic === "true"
        ? null
        : profilePicBase64 || existing.rows[0].profile_pic;

    const updatedResume =
      remove_resume === "true"
        ? null
        : resumeBase64 || existing.rows[0].resume;

    const updateResult = await pool.query(
      `UPDATE users
       SET bio = $1, profile_pic = $2, resume = $3
       WHERE id = $4
       RETURNING *`,
      [bio, updatedProfilePic, updatedResume, userId]
    );

    res.status(200).json({
      message: "Profile updated",
      profile: updateResult.rows[0],
    });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const skillsRoutes = require("./routes/skills");
const projectsRoutes = require("./routes/projects");
const certificationsRoutes = require("./routes/certifications");
const portfolioRoutes = require('./routes/portfolio');



const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/certifications", certificationsRoutes);
app.use('/api/portfolio', portfolioRoutes);


app.get("/", (req, res) => {
  res.send("🚀 SkillForge API is running!");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

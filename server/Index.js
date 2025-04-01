require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

// ✅ PostgreSQL Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Authentication Middleware
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized. Token missing!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// ✅ User Signup
app.post("/signup", async (req, res) => {
    const { name, email, password, phone, github, linkedin, profile_pic, bio, department, skills } = req.body;

    try {
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
            [name, email, hashedPassword]
        );

        const userId = newUser.rows[0].id;
        await pool.query(
            `INSERT INTO profile (id, name, email, phone, github, linkedin, profile_pic, bio, department, skills) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [userId, name, email, phone, github, linkedin, profile_pic, bio, department, skills]
        );

        res.status(201).json({ message: "User registered successfully", userId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// ✅ User Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// ✅ Get Profile API
app.get("/api/profile", authenticateUser, async (req, res) => {
    const userId = req.userId;

    try {
        const profile = await pool.query("SELECT * FROM profile WHERE id = $1", [userId]);

        if (profile.rows.length === 0) {
            return res.json({
                id: userId,
                name: "New User",
                email: "",
                phone: "",
                github: "",
                linkedin: "",
                profile_pic: "",
                bio: "No bio added yet",
                department: "",
                skills: []
            });
        }

        res.json(profile.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// ✅ Update Profile API
app.put("/api/profile", authenticateUser, async (req, res) => {
    const userId = req.userId;
    const { name, email, phone, github, linkedin, profile_pic, bio, department, skills } = req.body;

    try {
        await pool.query(
            `UPDATE profile SET name = $1, email = $2, phone = $3, github = $4, linkedin = $5, 
             profile_pic = $6, bio = $7, department = $8, skills = $9 WHERE id = $10`,
            [name, email, phone, github, linkedin, profile_pic, bio, department, skills, userId]
        );

        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});

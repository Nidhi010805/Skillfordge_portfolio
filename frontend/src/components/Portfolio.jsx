import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";


import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { Typewriter } from "react-simple-typewriter";
import { FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt } from "react-icons/fa";

const skillIcons = {
  react: <FaReact className="inline-block text-blue-500 mr-2" />,
  nodejs: <FaNodeJs className="inline-block text-green-600 mr-2" />,
  python: <FaPython className="inline-block text-yellow-500 mr-2" />,
  html: <FaHtml5 className="inline-block text-orange-600 mr-2" />,
  css: <FaCss3Alt className="inline-block text-blue-600 mr-2" />,
  javascript: <FaJsSquare className="inline-block text-yellow-400 mr-2" />,
  git: <FaGitAlt className="inline-block text-red-600 mr-2" />,
};

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  
  };

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const navItems = ["home", "about", "skills", "projects", "certifications", "contact"];

const Portfolio = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/portfolio/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error loading profile:", err));
  }, [userId]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Loading portfolio...
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-700 font-sans scroll-smooth">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1
            className="text-3xl font-extrabold tracking-wide text-blue-600 dark:text-blue-400 cursor-default select-none"
            aria-label="Portfolio Title"
          >
            {user.name || "Portfolio"}
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-10 text-sm font-semibold tracking-wide">
            {navItems.map((section) => (
              <motion.li
                key={section}
                className="relative group cursor-pointer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={`#${section}`}
                  className="capitalize text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {section}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Dark Mode & Hamburger */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Hamburger for mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={menuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-inner"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col space-y-4 px-6 py-6 text-lg font-semibold tracking-wide">
                {navItems.map((section) => (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className="capitalize hover:text-blue-600 dark:hover:text-blue-400 block"
                      onClick={() => setMenuOpen(false)}
                    >
                      {section}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-28">
      




<section id="home" className="text-center py-20 bg-white dark:bg-gray-900">
 <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
  


  
    <Typewriter
      words={[
       
        `Hello! everyone I am${user.name ? `, ${user.name}` : ''}!`,
        'Web Developer',
        'Designer',
        'DSA Enthusiast',
        'Coding Problem Solver'

      ]}
      loop={0} // infinite
      cursor
      cursorStyle="|"
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1500}
    />
   </h2>

  <p className="text-orange-600 dark:text-orange-400 text-xl font-semibold mb-2">
    Web Developer · Designer · DSA Enthusiast
  </p>

  <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
    Passionate about building responsive web apps, crafting clean UI, and solving problems with code.
  </p>

  <div className="flex justify-center gap-6">
    {user.resumeUrl && (
      <a
        href={user.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-orange-600 text-white px-8 py-3 rounded-md font-semibold shadow-md hover:bg-orange-700 transition transform hover:-translate-y-1"
      >
        📄 View Resume
      </a>
    )}

    <a
      href="#projects"
      className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-md font-semibold hover:bg-orange-50 dark:hover:bg-orange-700 dark:hover:text-white transition transform hover:-translate-y-1"
    >
      🚀 Explore Projects
    </a>
  </div>
</section>


{/* Home Section */}
<motion.section
  id="about"
  className="flex flex-col md:flex-row items-center gap-12"
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
  transition={{ duration: 0.7 }}
>
  {/* Text Content */}
  <div className="md:w-2/3 text-center md:text-left">
    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
      About 
    </h2>
    <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed min-h-[80px]">
      {user.bio || "No bio available."}
    </p>
  </div>

  {/* Profile Image */}
  <div className="md:w-1/3 flex justify-center md:justify-end">
    <img
      src={
        user.profile_pic
          ? `data:image/jpeg;base64,${user.profile_pic}`
          : "https://via.placeholder.com/192"
      }
      alt={`${user.name} profile`}
      className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-lg hover:shadow-xl transition-shadow duration-300"
      loading="lazy"
    />
  </div>
</motion.section>

        

        
<motion.section
  id="skills"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
  transition={{ duration: 0.6 }}
  className="max-w-4xl mx-auto px-4 py-10 text-center"
>
  {/* Heading */}
  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
  Skills
</h2>


  {/* Typewriter */}
  <p className="mb-8 text-lg font-medium min-h-[48px] text-gray-800 dark:text-gray-300">
    I learn these skills, "I keep improving every day</p>
    

  {/* Skills Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 justify-items-center">
    {user.skills?.length ? (
      user.skills.map((skill, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="text-5xl mb-2">{skillIcons[skill]}</div>
          <div className="text-gray-900 dark:text-white text-base font-semibold">
            {skill}
          </div>
        </motion.div>
      ))
    ) : (
      <p className="text-gray-500 dark:text-gray-400 italic col-span-full">
        No skills listed.
      </p>
    )}
  </div>
</motion.section>



<motion.section
  id="projects"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
  transition={{ duration: 0.6 }}
  className="max-w-6xl mx-auto px-4"
>
 <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Projects
            </h2>

  {user.projects?.length ? (
    <div className="grid gap-8 md:grid-cols-2">
      {user.projects.map((project, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-shadow"
        >
          {/* Image */}
          {project.image && (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
          )}

          {/* Text content */}
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {project.description}
            </p>
            <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3">
              Tech: {project.tech}
            </p>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-semibold transition-colors"
              >
                View Project →
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 dark:text-gray-400">No projects added yet.</p>
  )}
</motion.section>



        
        {/* Certifications Section Wrapper */}
<div className="max-w-6xl mx-auto px-6 py-10">
  {/* Section Heading */}
  <h2 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-pink-500 bg-clip-text text-transparent">
    Certificates & Achievements
  </h2>
  <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
    Continuous learning and improvement are the keys to success.
  </p>

  {/* Cards Container */}
  <motion.section
    id="certifications"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
  >
    {user.certifications?.length ? (
      user.certifications.map((cert, idx) => (
        <motion.a
          key={idx}
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-transform duration-300 flex flex-col justify-center items-center text-center"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {cert.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {cert.description || "Certified for excellence."}
          </p>
        </motion.a>
      ))
    ) : (
      <p className="text-center text-gray-500 dark:text-gray-400 italic col-span-full">
        No certifications listed.
      </p>
    )}
  </motion.section>
</div>



  
   <section
      id="contact"
      className="my-12 p-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm"
    >
      <div className="flex flex-col md:flex-row gap-10">
        {/* Contact Info */}
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Feel free to use the form or drop us an email. Old-fashioned phone calls work too.
          </p>
          {user.phone && (
            <p className="flex items-center text-gray-700 dark:text-gray-300">
              <FiPhone className="text-orange-500 mr-3" /> {user.phone}
            </p>
          )}
          {user.email && (
            <p className="flex items-center text-gray-700 dark:text-gray-300">
              <FiMail className="text-orange-500 mr-3" />
              <a href={`mailto:${user.email}`} className="hover:underline">
                {user.email}
              </a>
            </p>
          )}
          {user.address && (
            <p className="flex items-center text-gray-700 dark:text-gray-300">
              <FiMapPin className="text-orange-500 mr-3" /> {user.address}
            </p>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Phone (optional)
            </label>
            <input
              type="tel"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Message
            </label>
            <textarea
              rows="4"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>


    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 w-full border-t border-gray-300 dark:border-gray-700 px-4 py-10">
      <div className="w-full text-center space-y-6">

       
        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400">
          Welcome to my portfolio. Explore my projects, skills, and passion for creating clean and functional web experiences.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 text-xl">
          <a
            href={user.linkedin ? `https://linkedin.com/in/${user.linkedin}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href={user.github ? `https://github.com/${user.github}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href={user.twitter ? `https://twitter.com/${user.twitter}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center flex-wrap gap-4 text-sm mt-4">
      <a href="#home" className="border border-gray-400 rounded-full px-4 py-1 hover:bg-gray-200 transition">Home</a>
      <a href="#about" className="border border-gray-400 rounded-full px-4 py-1 hover:bg-gray-200 transition">About</a>
      <a href="#projects" className="border border-gray-400 rounded-full px-4 py-1 hover:bg-gray-200 transition">Projects</a>
      <a href="#contact" className="border border-gray-400 rounded-full px-4 py-1 hover:bg-gray-200 transition">Contact</a>
    </div>

        {/* Footer Credit */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Designed by <a href="/" className="text-blue-500 hover:underline">{user.name || "Your Name"}</a> © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  







      </main>
    </div>
  );
};

export default Portfolio;

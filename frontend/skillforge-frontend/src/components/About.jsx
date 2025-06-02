// File: pages/AboutPage.jsx
import React from "react";
import { FaUsers, FaProjectDiagram, FaClock, FaHeadset, FaQuoteLeft } from "react-icons/fa";

const AboutPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-16">
    <div className="max-w-5xl mx-auto space-y-16">

      {/* Introduction Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">About SkillForge</h1>
        <p className="text-lg leading-relaxed">
          SkillForge is a modern portfolio-building web app tailored for developers, students,
          and tech enthusiasts who want to organize and showcase their skills, certifications,
          and projects in one interactive and elegant platform. Whether you’re preparing for
          internships, job interviews, or hackathons — SkillForge helps you present your journey
          beautifully.
        </p>
      </section>

      {/* 2. Mission & Vision */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🎯 Our Mission</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            To empower learners and professionals by providing a single, elegant platform to manage and display
            their skills, achievements, and growth.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🔭 Our Vision</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            To become the go-to online portfolio tool that bridges the gap between self-learning and professional
            recognition—by making every user’s journey visual, interactive, and shareable.
          </p>
        </div>
      </section>

      {/* 3. Key Features */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">🚀 Key Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
          <li className="flex items-start space-x-3">
            <span className="text-2xl">🛠️</span>
            <div>
              <h3 className="font-medium">Skill Management</h3>
              <p className="mt-1 text-sm">
                Add, organize, and remove tech skills with ease. Each skill is rendered as a responsive “chip” you
                can pin or edit at any time.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-2xl">🎓</span>
            <div>
              <h3 className="font-medium">Certifications Showcase</h3>
              <p className="mt-1 text-sm">
                List all your certifications, link to credentials, and let recruiters verify your achievements in one click.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-2xl">📌</span>
            <div>
              <h3 className="font-medium">Pinned Resources</h3>
              <p className="mt-1 text-sm">
                Bookmark roadmaps, tutorials, and articles so you never lose track of your learning plan.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-2xl">💼</span>
            <div>
              <h3 className="font-medium">Projects Portfolio</h3>
              <p className="mt-1 text-sm">
                Showcase your personal and team projects with descriptions, tech stack tags, and live/demo links.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* 4. Architecture & Tech Stack */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🏗️ Architecture & Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Frontend</h3>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1 text-sm">
              <li>React & React Router</li>
              <li>Tailwind CSS (light/dark mode)</li>
              <li>React Icons & Framer Motion</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Backend & Database</h3>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1 text-sm">
              <li>Node.js & Express.js</li>
              <li>PostgreSQL</li>
              <li>RESTful APIs with JWT Authentication</li>
            </ul>
          </div>
        </div>
        {/* placeholder for architecture diagram */}
        <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
          [Architecture Diagram Here]
        </div>
      </section>

      {/* 5. Roadmap */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">🗺️ Roadmap</h2>
        <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
          <li>
            <strong>Q2 2025:</strong> Real-time collaboration on shared dashboards & dark-mode tweaks.
          </li>
          <li>
            <strong>Q3 2025:</strong> Social sharing (LinkedIn, Twitter cards) & public profiles.
          </li>
          <li>
            <strong>Q4 2025:</strong> Analytics & progress charts, goal-setting features.
          </li>
          <li>
            <strong>2026:</strong> Mobile app (iOS/Android) and AI-powered skill recommendations.
          </li>
        </ul>
      </section>

      {/* 6. Meet the Team */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">👩‍💻 Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example profile card */}
          {[
            { name: "Nidhi Devi", role: "Full-Stack Dev & Designer" },
            { name: "Rahul Kumar", role: "Backend Engineer" },
            { name: "Anjali Singh", role: "UI/UX Designer" },
          ].map((member) => (
            <div key={member.name} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="h-24 w-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-3" />
              <h3 className="font-medium text-gray-800 dark:text-white">{member.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center py-10">
  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">📊 Our Impact</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-blue-600 text-2xl font-semibold">
    <div><span className="block text-4xl">+1K</span> Users</div>
    <div><span className="block text-4xl">+500</span> Projects Tracked</div>
    <div><span className="block text-4xl">99%</span> Uptime</div>
    <div><span className="block text-4xl">24/7</span> Support</div>
  </div>
</section>
  {/* Stats Section */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold mb-6">📊 Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-blue-600 text-2xl font-semibold">
          <div><FaUsers className="text-4xl mx-auto mb-2" />+1K Users</div>
          <div><FaProjectDiagram className="text-4xl mx-auto mb-2" />+500 Projects</div>
          <div><FaClock className="text-4xl mx-auto mb-2" />99% Uptime</div>
          <div><FaHeadset className="text-4xl mx-auto mb-2" />24/7 Support</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">🗣️ What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <FaQuoteLeft className="text-blue-500 text-2xl mb-2" />
            <p className="italic">"SkillForge helped me land my first internship by showcasing my projects professionally!"</p>
            <p className="mt-4 font-medium text-blue-600">— Aditi, Frontend Developer</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <FaQuoteLeft className="text-blue-500 text-2xl mb-2" />
            <p className="italic">"The project section and certificate display are just perfect for a portfolio!"</p>
            <p className="mt-4 font-medium text-blue-600">— Rohan, CS Undergrad</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">🚀 Our Journey</h2>
        <ul className="space-y-4">
          <li><span className="font-bold text-blue-500">Jan 2025:</span> SkillForge prototype launched with basic features.</li>
          <li><span className="font-bold text-blue-500">Mar 2025:</span> PostgreSQL backend integrated with secure auth.</li>
          <li><span className="font-bold text-blue-500">Jun 2025:</span> Dark mode + draggable project cards added.</li>
          <li><span className="font-bold text-blue-500">Aug 2025:</span> Partnered with university clubs and mentors.</li>
        </ul>
      </section>

      {/* 7. FAQs */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">❓ Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Is SkillForge free?",
              a: "Yes! All core features are free. We’ll introduce premium analytics and collaboration soon.",
            },
            {
              q: "Can I export my data?",
              a: "Absolutely—export skills, projects, and certifications as PDF or JSON.",
            },
            {
              q: "How do I request a feature?",
              a: "Head to our GitHub issues page or drop us an email via the Contact form.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-800 dark:text-white">{q}</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  </div>
);

export default AboutPage;

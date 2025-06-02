import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center px-5 py-16 bg-white/90 min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="max-w-3xl mb-12">
        <h1 className="mt-7 text-4xl font-bold text-gray-900">Welcome to SkillForge</h1>
        <p className="text-lg text-gray-600 my-4">
          Create your personal developer portfolio — no coding needed. SkillForge makes it easy to showcase your skills, projects, and achievements.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
            onClick={() => navigate("/Dashboard")}
          >
            Explore
          </button>
          <button
            className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
            onClick={() => navigate("/signup")}
          >
            Join Now
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="my-16 p-10 bg-gray-100 rounded-xl w-4/5 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800">Why SkillForge?</h2>
        <p className="text-gray-600 mt-4">
          Not a web developer? No problem. SkillForge helps students and professionals create beautiful portfolios without writing a single line of code.
          Highlight your skills, projects, resume, and certifications — all in one place.
        </p>
        <div className="flex justify-center gap-8 flex-wrap mt-6">
          <div className="bg-white p-4 rounded-xl shadow text-center min-w-[120px]">
            <h3 className="text-2xl text-blue-600 font-bold">50K+</h3>
            <p className="text-gray-600">Projects Hosted</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center min-w-[120px]">
            <h3 className="text-2xl text-blue-600 font-bold">100K+</h3>
            <p className="text-gray-600">Developers Connected</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center min-w-[120px]">
            <h3 className="text-2xl text-blue-600 font-bold">500+</h3>
            <p className="text-gray-600">Companies Recruiting</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex justify-center gap-6 flex-wrap mt-10 w-full max-w-6xl">
        <div className="bg-white/90 p-6 rounded-xl shadow max-w-xs w-full">
          <h2 className="text-blue-600 text-xl font-semibold">🚀 Build</h2>
          <p className="text-gray-700 mt-2">Develop and showcase your coding projects effortlessly.</p>
        </div>
        <div className="bg-white/90 p-6 rounded-xl shadow max-w-xs w-full">
          <h2 className="text-blue-600 text-xl font-semibold">🌎 Discover</h2>
          <p className="text-gray-700 mt-2">Explore innovative projects from developers worldwide.</p>
        </div>
        <div className="bg-white/90 p-6 rounded-xl shadow max-w-xs w-full">
          <h2 className="text-blue-600 text-xl font-semibold">🤝 Collaborate</h2>
          <p className="text-gray-700 mt-2">Join open-source projects and connect with a thriving developer community.</p>
        </div>
        <div className="bg-white/90 p-6 rounded-xl shadow max-w-xs w-full">
          <h2 className="text-blue-600 text-xl font-semibold">🧩 No Code Needed</h2>
          <p className="text-gray-700 mt-2">
            Don’t know web development? You can still build a stunning portfolio in minutes with SkillForge.
          </p>
        </div>
      </section>

      {/* Community Section */}
      <section className="mt-16 p-10 bg-blue-600 text-white rounded-xl w-4/5 max-w-4xl">
        <h2 className="text-2xl font-semibold">Join Our Developer Community</h2>
        <p className="mt-4">
          Engage in discussions, participate in hackathons, and contribute to open-source
          projects with developers from around the world.
        </p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Join the Community
        </button>
      </section>

      {/* Testimonials */}
      <section className="mt-16 w-full max-w-3xl px-4">
        <h2 className="text-2xl font-semibold text-gray-800">What Developers Say</h2>
        <div className="bg-gray-50 mt-6 p-4 rounded-xl shadow">
          <p className="text-gray-700">
            "I had no idea how to build a portfolio, but SkillForge made it so simple. Now I can proudly share my profile with recruiters."
          </p>
          <h4 className="mt-3 font-medium text-gray-800">— Ravi Yadav, Electrical Engineering Student</h4>
        </div>
        <div className="bg-gray-50 mt-6 p-4 rounded-xl shadow">
          <p className="text-gray-700">
            "This platform helped me connect with like-minded developers and collaborate on
            exciting open-source projects."
          </p>
          <h4 className="mt-3 font-medium text-gray-800">— Priya Verma, Web Developer</h4>
        </div>
      </section>
    </div>
  );
};

export default Home;

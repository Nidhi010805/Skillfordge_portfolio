import React, { useState } from 'react';
import axios from 'axios';

const ProjectSection = ({ projects, setProjects }) => {
  const [newProject, setNewProject] = useState({ name: '', description: '', tech: '', link: '' });

  const handleProjectAdd = async () => {
    if (!newProject.name.trim()) return;

    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('https://skillfordge-portfolio-5.onrender.com/api/projects', newProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const savedProject = res.data;
      setProjects([...projects, savedProject]);
      setNewProject({ name: '', description: '', tech: '', link: '' });
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to add project');
    }
  };

  const handleProjectRemove = async (project) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://skillfordge-portfolio-5.onrender.com/api/projects/${project.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p.id !== project.id));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p>{project.description}</p>
            <p>
              <strong>Tech:</strong> {project.tech}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                🔗 View Project
              </a>
            )}
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => handleProjectRemove(project)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add New Project Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          ➕ Add New Project
        </h3>

        <input
          type="text"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          placeholder="Project Name"
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          placeholder="Project Description"
          rows={3}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={newProject.tech}
          onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
          placeholder="Tech Stack (e.g. React, Node.js)"
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={newProject.link}
          onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
          placeholder="Project Link (GitHub, Live Demo, etc.)"
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-right">
          <button
            onClick={handleProjectAdd}
            className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
import React, { useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://skillfordge-portfolio-7.onrender.com';

const SkillsSection = ({ skills, setSkills, newSkill, setNewSkill }) => {

  // Backend se skills fetch karo component mount hone pe
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/api/skills`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSkills(res.data.skills);  // backend se skills array milega [{id, skill}, ...]
      } catch (error) {
        console.error('Failed to fetch skills', error);
      }
    };
    fetchSkills();
  }, [setSkills]);

  // Nayi skill add karne ke liye function
  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BASE_URL}/api/skills`,
        { skill: newSkill },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        // Backend se aaye naye skill ka id bhi add karo state me
        setSkills(prev => [...prev, { id: res.data.skillId, skill: newSkill }]);
        setNewSkill('');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  // Skill delete karne ke liye function
  const handleRemoveSkill = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${BASE_URL}/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        setSkills(skills.filter(skill => skill.id !== id));
      }
    } catch (error) {
      console.error('Error removing skill:', error);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">🛠️ Skills</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map(({ id, skill }) => (
          <li key={id} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
            {skill}
            <button
              onClick={() => handleRemoveSkill(id)}
              className="text-red-500 hover:text-red-700"
              title="Remove"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add skill"
          className="flex-grow px-2 py-1 text-sm border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddSkill}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;

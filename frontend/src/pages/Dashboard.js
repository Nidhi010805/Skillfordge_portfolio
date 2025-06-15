import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';



import ProfileSection from '../components/ProfileSection';
import SkillsSection from '../components/SkillsSection';
import CertificationsSection from '../components/CertificationsSection';
import RemindersSection from '../components/RemindersSection';
import ResourcesSection from '../components/ResourcesSection';
import ProjectSection from '../components/ProjectSection';

const Dashboard = () => {
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const [newSkill, setNewSkill] = useState('');
  const [newCert, setNewCert] = useState({ title: '', link: '' });
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();


  // Assuming you store userId in localStorage or JWT
  const userId = localStorage.getItem('userId'); 
   // Adjust if stored elsewhere

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('https://skillfordge-portfolio-7.onrender.com/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBio(res.data.bio || '');
        setSkills(res.data.skills ? res.data.skills.split(',').map(skill => skill.trim()) : []);
        setImage(res.data.profile_pic || null);
        setCertifications(res.data.certifications || []);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('https://skillfordge-portfolio-7.onrender.com/api/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data || []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('skills', skills.join(','));
    formData.append('certifications', JSON.stringify(certifications));
    formData.append('projects', JSON.stringify(projects));
    if (image) formData.append('profile_pic', image);
    if (resume) formData.append('resume', resume);

    try {
      await axios.put('https://skillfordge-portfolio-7.onrender.com/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };
  


  return (
    <div className="mt-16 flex flex-col lg:flex-row min-h-screen gap-6 p-6 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-6">
        <ProfileSection
          image={image}
          setImage={setImage}
          bio={bio}
          setBio={setBio}
          resume={resume}
          setResume={setResume}
          handleImageUpload={handleImageUpload}
          handleResumeUpload={handleResumeUpload}
        />
        <SkillsSection
          skills={skills}
          setSkills={setSkills}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
        />
        <CertificationsSection
          certifications={certifications}
          setCertifications={setCertifications}
          newCert={newCert}
          setNewCert={setNewCert}
        />
        <RemindersSection />
        <ResourcesSection />

        {/* Link to Public Profile */}
        {userId && (
          <div className="mt-8">
            <Link
              to={`/portfolio/${userId}`}
              className="block px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition"
            >
              View Your Public Profile
            </Link>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 space-y-8">
        <h2 className="text-2xl font-semibold">Your Projects</h2>

        <ProjectSection
          projects={projects}
          setProjects={setProjects}
        />
<div className="mt-6 flex flex-col sm:flex-row justify-end items-center gap-4">
  {/* Save Changes Button */}
  <button
    onClick={handleSave}
    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition-all shadow-lg"
  >
    📂 <span>Save Changes</span>
  </button>

  {/* Get Portfolio Button */}
  {userId && (
    <button
      onClick={() => window.open(`https://skillfordge-portfolio-lkl3.vercel.app/portfolio/${userId}`, '_blank')}
      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 transition-all shadow-lg"
    >
      🔗 <span>Get Your Portfolio</span>
    </button>
  

  
)}



        </div>
      </main>
    </div>
  );
};

export default Dashboard;

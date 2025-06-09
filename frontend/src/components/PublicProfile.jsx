import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Reuse your existing read-only components here, with editable=false

const PublicProfile = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const res = await axios.get(`https://skillfordge-portfolio-5.onrender.com/api/public-profile/${username}`);
        setProfile(res.data);
      } catch (error) {
        console.error('Error loading public profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>User not found.</div>;

  return (
    <div className="public-profile-container p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <img
        src={profile.profile_pic || '/default-avatar.png'}
        alt={`${profile.name} profile`}
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h1 className="text-3xl text-center mt-4">{profile.name || profile.username}</h1>
      <p className="text-center mt-2">{profile.bio}</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {profile.skills?.map((skill, i) => (
            <li key={i} className="px-3 py-1 bg-blue-100 rounded">{skill}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Certifications</h2>
        <ul>
          {profile.certifications?.map((cert, i) => (
            <li key={i}>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {cert.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        <ul>
          {profile.projects?.map((proj, i) => (
            <li key={i} className="mb-4">
              <h3 className="text-lg font-semibold">{proj.title}</h3>
              <p>{proj.description}</p>
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Project
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PublicProfile;

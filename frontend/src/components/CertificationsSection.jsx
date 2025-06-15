import React, { useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "https://skillfordge-portfolio-7.onrender.com";

const CertificationsSection = ({ certifications, setCertifications, newCert, setNewCert }) => {

  // Fetch certifications on mount
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/api/certifications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCertifications(res.data);  // should be an array of { id, title, link }
      } catch (error) {
        console.error('Failed to fetch certifications:', error);
      }
    };
    fetchCertifications();
  }, [setCertifications]);

  const handleAddCertification = async () => {
    if (!newCert.title.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BASE_URL}/api/certifications`,
        { title: newCert.title, link: newCert.link },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        const inserted = res.data.certification;
        setCertifications(prev => [...prev, inserted]);
        setNewCert({ title: '', link: '' });
      }
    } catch (error) {
      console.error('Error adding certification:', error);
    }
  };

  const handleRemoveCertification = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${BASE_URL}/api/certifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        setCertifications(prev => prev.filter(cert => cert.id !== id));
      }
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">🎓 Certifications</h3>
      <ul className="space-y-2 text-sm">
        {certifications.map(cert => (
          <li key={cert.id} className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-md">
            <div className="flex items-center gap-2">
              <span>{cert.title}</span>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                  title="View Certificate"
                >
                  🔗
                </a>
              )}
            </div>
            <button
              onClick={() => handleRemoveCertification(cert.id)}
              className="text-red-500 hover:text-red-700 text-sm"
              title="Remove"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={newCert.title}
          onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
          placeholder="Certification Title"
          className="px-2 py-1 text-sm border border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={newCert.link}
          onChange={(e) => setNewCert({ ...newCert, link: e.target.value })}
          placeholder="Certification Link (optional)"
          className="px-2 py-1 text-sm border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddCertification}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 w-fit self-end"
        >
          Add Certification
        </button>
      </div>
    </div>
  );
};

export default CertificationsSection;

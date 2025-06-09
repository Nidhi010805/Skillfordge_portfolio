import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ProfileSection = () => {
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const imageObjectUrl = useRef(null);
  const resumeObjectUrl = useRef(null);

  const token = localStorage.getItem("token"); // Adjust if stored elsewhere

  useEffect(() => {
    axios
      .get("https://skillfordge-portfolio-5.onrender.com/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const profile = res.data;
        setBio(profile.bio || "");

        if (profile.profile_pic) {
          // Base64 string from backend, add data URI prefix
          setImage(`data:image/png;base64,${profile.profile_pic}`);
        } else {
          setImage(null);
        }

        if (profile.resume) {
          // Base64 PDF from backend, add data URI prefix
          setResume(`data:application/pdf;base64,${profile.resume}`);
        } else {
          setResume(null);
        }
      })
      .catch((err) => console.error("Error loading profile:", err));
  }, [token]);

  const revokeObjectUrl = (ref) => {
    if (ref.current) {
      URL.revokeObjectURL(ref.current);
      ref.current = null;
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      revokeObjectUrl(imageObjectUrl);
      const file = e.target.files[0];
      imageObjectUrl.current = URL.createObjectURL(file);
      setProfilePicFile(file);
      setImage(imageObjectUrl.current);
    }
  };

  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      revokeObjectUrl(resumeObjectUrl);
      const file = e.target.files[0];
      resumeObjectUrl.current = URL.createObjectURL(file);
      setResumeFile(file);
      setResume(resumeObjectUrl.current);
    }
  };

  const handleRemoveImage = () => {
    revokeObjectUrl(imageObjectUrl);
    setImage(null);
    setProfilePicFile(null);
  };

  const handleRemoveResume = () => {
    revokeObjectUrl(resumeObjectUrl);
    setResume(null);
    setResumeFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bio", bio);

    if (image === null) {
      formData.append("remove_profile_pic", "true");
    } else if (profilePicFile) {
      formData.append("profile_pic", profilePicFile);
    }

    if (resume === null) {
      formData.append("remove_resume", "true");
    } else if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      const res = await axios.put("https://skillfordge-portfolio-5.onrender.com/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully!");

      const updated = res.data.profile;

      if (updated.profile_pic) {
        revokeObjectUrl(imageObjectUrl);
        setImage(`data:image/png;base64,${updated.profile_pic}`);
        setProfilePicFile(null);
      } else {
        handleRemoveImage();
      }

      if (updated.resume) {
        revokeObjectUrl(resumeObjectUrl);
        setResume(`data:application/pdf;base64,${updated.resume}`);
        setResumeFile(null);
      } else {
        handleRemoveResume();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="flex flex-col items-center cursor-pointer relative">
        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
        <img
          src={image || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 hover:opacity-80 transition"
        />
        <span className="mt-2 text-sm text-gray-500">Upload Image</span>

        {image && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveImage();
            }}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
            title="Remove Image"
          >
            ×
          </button>
        )}
      </label>

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Write your bio..."
        className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none text-sm"
      />

      <div>
        <p className="text-sm font-semibold text-gray-700">Resume</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="text-sm mt-1"
        />
        {resume && (
          <div className="mt-1 flex items-center space-x-2">
            <p className="text-sm text-blue-600">
              📄{" "}
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View Resume
              </a>
            </p>
            <button
              type="button"
              onClick={handleRemoveResume}
              className="text-red-600 hover:text-red-800 text-xs"
              title="Remove Resume"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileSection;

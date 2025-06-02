import React from "react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.body}</p>
      <a href={project.link ? project.link : "/"} className="view-btn">
        View Details
      </a>
    </div>
  );
};

export default ProjectCard;

import React, { useState } from "react";
import "./ProjectsTable.css";

const ProjectsTable = ({ type, projects }) => {
  console.log("my project", projects);
  return (
    <div className="ProjectsTable">
      <table className="table-container">
        <tbody>
          <tr className="table-heading">
            <th className="t-heading">Project Name</th>
            <th className="t-heading">Status</th>
            <th className="t-heading">Project Ref</th>
            <th className="t-heading">
              {type === "client" ? "Client's Email" : "Freelancer's Email"}
            </th>
            <th className="t-heading">Due Date</th>
            <th className="t-heading">Project Requirements</th>
            <th className="t-heading">Actions</th>
          </tr>
          {projects &&
            projects.length > 0 &&
            projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td className="pt-t-data">
                    <div className="pt-project-name">{project.title}</div>
                  </td>
                  <td className="pt-t-data">
                    <div className="pt-project-status">{project.status}</div>
                  </td>
                  <td className="pt-t-data">
                    <span className="pt-project-ref">{project.id}</span>
                  </td>
                  <td className="pt-t-data">
                    <div className="pt-email">
                      {type === "client"
                        ? project.freelancerEmail
                        : type === "freelancer"
                        ? project.clientEmail
                        : "N/A"}
                    </div>
                  </td>

                  <td className="pt-t-data">
                    <div className="pt-deadline">{project.deadline}</div>
                  </td>
                  <td className="pt-t-data">
                    <div className="pt-project-requirements">
                      {project.date}
                    </div>
                  </td>
                  <td className="pt-t-data">
                    <div className="pt-action-buttons">
                      <button className="pt-action-button">View</button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;

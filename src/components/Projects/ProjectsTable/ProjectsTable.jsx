import React, { useState, useRef } from "react";
import "./ProjectsTable.css";
import { SlOptionsVertical } from "react-icons/sl";

const ProjectsTable = ({ type, projects }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [current, setCurrent] = useState("");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  return (
    <div className="ProjectsTable">
      <table className="pj-table-container">
        <tbody>
          <tr className="pj-table-heading">
            <th className="pj-t-heading">Project Name</th>
            <th className="pj-t-heading">Status</th>
            <th className="pj-t-heading">Project Ref</th>
            <th className="pj-t-heading">
              {type === "client" ? "Client's Email" : "Freelancer's Email"}
            </th>
            <th className="pj-t-heading">Due Date</th>
            <th className="pj-t-heading">Project Requirements</th>
            <th className="pj-t-heading">Actions</th>
          </tr>
          {projects &&
            projects.length > 0 &&
            projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td className="pj-t-data">
                    <div className="pj-project-name">{project.title}</div>
                  </td>
                  <td className="pj-t-data">
                    <div className="pj-project-status">{project.status}</div>
                  </td>
                  <td className="pj-t-data">
                    <span className="pj-project-ref">{project.id}</span>
                  </td>
                  <td className="pj-t-data">
                    <div className="pj-email">
                      {type === "client"
                        ? project.freelancerEmail !== ""
                          ? project.freelancerEmail
                          : "N/A"
                        : project.clientEmail !== ""
                        ? project.clientEmail
                        : "N/A"}
                    </div>
                  </td>

                  <td className="pj-t-data">
                    <div className="pj-deadline">{project.deadline}</div>
                  </td>
                  <td className="pj-t-data">
                    <div className="pj-project-requirements">
                      {project.requirements[0]}
                    </div>
                  </td>
                  <td className="pj-t-data pj-context-parent">
                    <div className="pj-action-buttons">
                      <button className="pj-action-button">View</button>
                      <SlOptionsVertical
                        className="pj-options"
                        onClick={() => {
                          setShowMenu(!showMenu);
                          setCurrent(project.id);
                        }}
                        ref={buttonRef}
                      />
                    </div>
                    {showMenu && current === project.id && (
                      <div className="pj-context-menu" ref={menuRef}>
                        <div>Project Actions</div>
                        <button>Approve project</button>
                        <button>Decline project</button>
                        <button>View SLA</button>
                        <button>Pay project</button>
                        <button>Rate the service</button>
                      </div>
                    )}
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

import React, { useEffect, useState } from "react";
import "./Projects.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Navbar from "../../components/Common/Navbar/navbar";
import ProfileSubNav from "../../components/Profile/ProfileSubNav/ProfileSubNav";
import ProjectsTabsHeader from "../../components/Projects/ProjectsTabsHeader/ProjectsTabsHeader";
import ProjectsTable from "../../components/Projects/ProjectsTable/ProjectsTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [clients, setClients] = useState({});
  const [freelancers, setFreelancers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    fetchProjects();
  }, [navigate]);
  useEffect(() => {
    const filteredData = projects
      .filter((item) => {
        console.log(filter, item.status);
        if (filter === "All") return true;
        if (filter === "Completed")
          return item.status === "completed" || item.status === "approved";
        if (filter === "Pending") return item.status === "pending";
        if (filter === "Cancelled") return item.status === "cancelled";
      })
      .filter((item) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        return (
          (item.title && item.title.toLowerCase().includes(searchLower)) ||
          (item.description &&
            item.description.toLowerCase().includes(searchLower)) ||
          (item.clientId &&
            item.clientId.toLowerCase().includes(searchLower)) ||
          (item.freelancerId &&
            item.freelancerId.toLowerCase().includes(searchLower))
        );
      });
    console.log({ filteredData });
    if (filteredData.length > 0) {
      setFilteredData(filteredData);
    } else {
      setFilteredData([]);
    }
  }, [filter, searchTerm]);

  const fetchProjects = async () => {
    setLoading(true);

    try {
      const freelancers = await fetchFreelancers();
      const clients = await fetchClients();
      const response = await axios.get("http://localhost:8000/api/projects", {
        headers: {
          Authorization: token,
        },
      });
      let filteredProjects =
        role === "freelancer"
          ? response.data.projects.filter(
              (project) => project.freelancerId === uid
            )
          : response.data.projects.filter(
              (project) => project.clientId === uid
            );
      const updatedProjects = filteredProjects.map((project) => {
        let clientEmail = "";
        let freelancerEmail = "";
        clients.forEach((client) => {
          console.log(client.id === project.clientId);

          if (client.id === project.clientId) {
            console.log("running", { e: client.email });

            clientEmail = client.email;
          }
        });
        freelancers.forEach((freelancer) => {
          if (freelancer.id === project.freelancerId) {
            console.log("running", { e: freelancer.email });
            freelancerEmail = freelancer.email;
          }
        });
        console.log({ ...project, clientEmail, freelancerEmail });
        ``;
        return { ...project, clientEmail, freelancerEmail };
      });
      setProjects(updatedProjects);
      setFilteredData(updatedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.message);
      if (error.response?.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/clients", {
        headers: {
          Authorization: token,
        },
      });
      return response.data.clients;
    } catch (error) {
      console.error("Error fetching clients:", error);
      if (error.response?.status === 401) {
        navigate("/");
      }
    }
  };

  const fetchFreelancers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/freelancers",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data.freelancers;
    } catch (error) {
      console.error("Error fetching freelancers:", error);
      if (error.response?.status === 401) {
        navigate("/");
      }
    }
  };
  console.log({ projects });
  return (
    <div className="Projects">
      <Navbar />
      <ProfileSubNav />
      <div className="pj-search-upload">
        <SearchBar onSearch={setSearchTerm} />
        {role === "freelancer" && (
          <button className="pj-upload-btn">Upload project</button>
        )}
      </div>
      <ProjectsTabsHeader handleTabChange={setFilter} />
      <div className="pj-main-container">
        {filteredData.length > 0 ? (
          <ProjectsTable type={role} projects={filteredData} />
        ) : (
          <div className="pj-no-data">No data</div>
        )}
      </div>
    </div>
  );
};

export default Projects;

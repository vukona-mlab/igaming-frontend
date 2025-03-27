import React, { useEffect, useState } from "react";
import "./DocumentsTable.css";

export default function DocumentsTable({ statusFilter }) {
  const [documents, setDocuments] = useState([]);
  const [email, setEmail] = useState(""); // State for user email

  const userId = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  // Fetching documents and user data from the API
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/auth/users/${userId}`,
          {
            headers: { Authorization: token },
          }
        );

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data.user && Array.isArray(data.user.documents)) {
          setEmail(data.user.email || "");
          setDocuments(data.user.documents || []);
          console.log("Documents set in state:", data.user.documents);
        } else {
          console.log("No documents found");
          setDocuments([]);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [userId, token]);

  // Handle document deletion
  const handleDelete = async (docId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/users/${userId}/documents/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json", // Specify the content type as JSON
          },
          body: JSON.stringify({ docId }),
        }
      );
      const data = await response.json();
      console.log("delete response", data);
      console.log("doc name", docId);

      if (response.ok) {
        // If delete was successful, update the state by removing the document from the list
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.id !== docId)
        );
        console.log(`Document with ID ${docId} was deleted`);
      } else {
        console.error("Error deleting document:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="overlord">
      {/* Documents Table */}
      <table className="table-container">
        <thead>
          <tr className="table-heading">
            <th className="t-heading">Document Name</th>
            <th className="t-heading">Status</th>
            <th className="t-heading">Document Type</th>
            <th className="t-heading">Email</th>
            <th className="t-heading">Date Added</th>
            <th className="t-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents
            .filter((doc) => doc.status.toLowerCase() === statusFilter) // Filter by selected status
            .map((doc) => (
              <tr key={doc.id}>
                <td className="t-data">{doc.documentName}</td>
                <td className="t-data">{doc.status}</td>
                <td className="t-data">{doc.documentType}</td>
                <td className="t-data">{email}</td>
                <td className="t-data">
                  {new Date(doc.dateAdded).toLocaleDateString()}
                </td>
                <td className="t-data">
                  <div className="action-buttons">
                    <button
                      className="view-button"
                      onClick={() => window.open(doc.url, "_blank")}
                    >
                      View
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(doc.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

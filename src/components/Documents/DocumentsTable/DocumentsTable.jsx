import React, { useEffect, useState } from 'react';
import './DocumentsTable.css';

export default function DocumentsTable({ statusFilter }) {
  const [documents, setDocuments] = useState([]);
  const [email, setEmail] = useState(""); // State for user email

  const userId = localStorage.getItem("uid");
  const token = localStorage.getItem("token");

  // Fetching documents and user data from the API
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/auth/users/${userId}`, {
          headers: { Authorization: token },
        });

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

  return (
    <div className="overlord">
      {/* Display User Email */}
      <h3 className="user-email">User Email: {email}</h3>

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
                <td className="t-data">{new Date(doc.dateAdded).toLocaleDateString()}</td>
                <td className="t-data">
                  <div className="action-buttons">
                    <button className="view-button" onClick={() => window.open(doc.url, '_blank')}>View</button>
                    <button className="delete-button" onClick={() => handleDelete(doc.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
//
// Handle document deletion
const handleDelete = (docId) => {
  // You would perform a delete request to your API here
  console.log(`Document with ID ${docId} is being deleted`);
  // For now, just log the ID of the document that is being deleted
};

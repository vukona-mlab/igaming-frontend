import React, { useState } from "react";
import { FaFileUpload, FaEye, FaTrash } from "react-icons/fa";
import { Container, Button, Form, Table } from "react-bootstrap";
import axios from "axios";

const DocumentUpload = () => {
  // Predefined document types as an object
  const documentTypes = {
    identity: "Identity Document",
    residence: "Proof of Residence",
    certificate: "Professional Certificate",
    license: "Driver's Licence",
    passport: "Passport",
    bank: "Bank Statement",
  };

  // Function to get the current date in YYYY-MM-DD format
  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  // State to store documents
  const [documents, setDocuments] = useState(
    Object.entries(documentTypes).map(([key, type], index) => ({
      id: key,
      type,
      date: "",
      file: null,
      url: "",
    }))
  );

  // Handle file selection
  const handleFileSelect = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments((prevDocs) =>
        prevDocs.map((doc) =>
          doc.id === id
            ? { ...doc, file, url: URL.createObjectURL(file), date: getCurrentDate() }
            : doc
        )
      );
    }
  };

  // Handle file deletion
  const handleDelete = (id) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === id ? { ...doc, file: null, url: "", date: "" } : doc
      )
    );
  };

  // Reset all fields when canceling
  const handleCancel = () => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => ({ ...doc, file: null, url: "", date: "" }))
    );
  };

  // Handle form submission (uploading documents)
  const handleSubmit = async () => {
    const formData = new FormData();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("uid");

    // Append each document's file & metadata
    documents.forEach((doc) => {
      if (doc.file) {
        formData.append("documents", doc.file);
        formData.append(
          "documentsArr[]",
          JSON.stringify({ documentName: doc.file.name, documentType: doc.type, dateAdded: doc.date })
        );
      }
    });

    console.log("Submitting Documents:", documents);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/auth/users/${userId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      alert("Documents uploaded successfully!");
      console.log(response.data);
      handleCancel();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload documents.");
    }
  };

  return (
    <Container className="mt-4">
      <h3>Upload Documents</h3>
      <Table className="table-borderless mt-4" hover>
        <thead className="bg-light">
          <tr>
            <th>Document Type</th>
            <th>Date</th>
            <th>File</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.type}</td>
              <td>
                <Form.Control type="date" value={doc.date} readOnly />
              </td>
              <td>
                {!doc.file ? (
                  <label className="btn btn-outline-primary btn-sm">
                    <FaFileUpload size={18} /> Upload
                    <input
                      type="file"
                      className="d-none"
                      onChange={(e) => handleFileSelect(doc.id, e)}
                    />
                  </label>
                ) : (
                  <span>{doc.file.name}</span>
                )}
              </td>
              <td>
                {doc.file && (
                  <>
                    <Button variant="success" size="sm" className="me-2" href={doc.url} target="_blank">
                      <FaEye /> View
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(doc.id)}>
                      <FaTrash /> Remove
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Submit and Cancel Buttons */}
      <div className="mt-3">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default DocumentUpload;

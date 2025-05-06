import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewRecord.css";
import Card from "../PatientCard/Card"; // Adjust path as per your project structure

const ViewRecord = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get("https://caredocs-z1ob.onrender.com/getrecords", {
          withCredentials: true,
        });
        // console.log(response.data);
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleDelete = (deletedItemId) => {
    setPatients(patients.filter((patient) => patient._id !== deletedItemId));
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (patients.length === 0) {
    return <div>No patient records found for this user</div>;
  }

  return (
    <div className="mainviewrecpage">
      <div className="viewrecordhead"><h1>View Your Records</h1></div>
      <div className="card-container">
        {patients.map((patient) => (
          <Card key={patient._id} item={patient} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ViewRecord;

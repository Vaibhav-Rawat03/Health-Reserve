/* eslint-disable no-unused-vars */
// src/components/Navbar/Navpatient.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navdoctor.css";
import axios from "axios";
import { useState, useEffect } from "react";
//import logo from './path/to/logo'; // Update the path to the actual location of your logo

function Navdoctor() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("profile");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://caredocs-z1ob.onrender.com/getdata", {
          withCredentials: true,
        });
        // console.log(response.data)
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <h1>Health Reserve</h1>
        </div>
        <div className="right">
          <ul className="doc">
            <li>
            <a href="https://upes-open.org/">CONTACT US</a>
            </li>
            <li>
              <Link to={`/viewrecord`}>VIEW RECORDS</Link>
            </li>
            {user.role === "Doctor" && <li>
              <Link to="/doctors">SEE PATIENTS</Link>
            </li>}
            {user.role === "Patient" &&
              (<>
                <li>
                  <Link to="/patients">SEE DOCTORS</Link>
                </li>
                <li>
                  <Link to="/upload">UPLOAD RECORDS</Link>
                </li>
              </>)}
          </ul>
          <div className="profile" onClick={handleClick}>
            <img src="/profile.jpeg" alt="Profile Picture" />
            <div className="upload-text">Upload Your Image</div>
            <span>{user.username}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navdoctor;
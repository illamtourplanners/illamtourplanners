import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { axiosInstance } from "../../config/axiosInstance";
export const AdminAuth = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();


 useEffect(() => {
  const checkAdmin = async () => {
    setTimeout(async () => {
      try {
        const response = await axiosInstance.get("/admin/check-admin", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    }, 1000); // Optional delay
  };

  checkAdmin(); // Don't forget to call the function
}, [navigate]);


  console.log("auth", user);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <img
          src="https://cdn.dribbble.com/users/563824/screenshots/3306683/untitled-6-110.gif"
          alt="Loading..."
          style={{ width: "200px",}}
        />
      </div>
    );
  }

  return user ? children : <div>Admin not authenticated</div>;
};

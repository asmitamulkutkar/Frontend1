/* eslint-disable no-unused-vars */
// ServiceRequestList.js

import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import Header from "./Header"; // Import the Header component
import Footer from "./Footer"; // Import the Footer component
import { Link } from "react-router-dom";

const ServiceRequestList = () => {
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/service-req", { withCredentials: true });
        setServiceRequests(response.data, { withCredentials: true });
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    };

    fetchServiceRequests();
  }, []);

  const handleAccept = async (req) => {
    try {
      await axios.put(`http://localhost:8000/service-req/${req._id}`, {
        req_status: "Approved", user_id: req.user_id, sp_user_id: req.sp_user_id,
        description: req.description, service_request: req.service_request
      },
        { withCredentials: true });
      // Update the state to reflect the changes
      setServiceRequests(
        serviceRequests.map((request) =>
          request._id === req._id ? { ...request, req_status: "Approved" } : request
        )
      );
    } catch (error) {
      console.error("Error accepting service request:", error);
    }
  };

  const handleDecline = async (req) => {
    try {
      await axios.put(`http://localhost:8000/service-req/${req._id}`, {
        req_status: "Rejected", user_id: req.user_id, sp_user_id: req.sp_user_id,
        description: req.description, service_request: req.service_request
      }, { withCredentials: true });
      // Update the state to reflect the changes
      setServiceRequests(
        serviceRequests.map((request) =>
          request._id === req._id ? { ...request, req_status: "Rejected" } : request
        )
      );
    } catch (error) {
      console.error("Error declining service request:", error);
    }
  };

  return (
    <div>
      <Header /> {/* Include the Header component */}
      <div className="container">
        <h2>Service Requests</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((request) => (
              <tr key={request._id}>
                <td>
                  <Link to={`/userprofile/${request.user_id}`}>
                         {request.user_id}
                   </Link>
                </td>
                <td>{request.description}</td>
                <td>{request.req_status}</td>
                <td>
                  {request.req_status === "Pending" && (
                    <>
                      <Button
                        variant="success"
                        onClick={() => handleAccept(request)}
                      >
                        Accept
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDecline(request)}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default ServiceRequestList;

/* eslint-disable no-unused-vars */
// ServiceRequestList.js

import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import Header from "./Header"; // Import the Header component
import Footer from "./Footer"; // Import the Footer component

const ServiceRequestList = () => {
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/service-req");
        setServiceRequests(response.data, { withCredentials: true });
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    };

    fetchServiceRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`/service-req/${id}`, { req_status: "Approved" });
      // Update the state to reflect the changes
      setServiceRequests(
        serviceRequests.map((request) =>
          request._id === id ? { ...request, req_status: "Approved" } : request
        )
      );
    } catch (error) {
      console.error("Error accepting service request:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.put(`/service-req/${id}`, { req_status: "Rejected" });
      // Update the state to reflect the changes
      setServiceRequests(
        serviceRequests.map((request) =>
          request._id === id ? { ...request, req_status: "Rejected" } : request
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
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.description}</td>
                <td>{request.req_status}</td>
                <td>
                  {request.req_status === "Pending" && (
                    <>
                      <Button
                        variant="success"
                        onClick={() => handleAccept(request._id)}
                      >
                        Accept
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDecline(request._id)}
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

/* eslint-disable no-unused-vars */
// CRequests.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CHeader from "./CHeader";
import CFooter from "./CFooter";

const CRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8000/service-req", {
          withCredentials: true,
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <Container>
        <h2 className="my-4">My Requests</h2>
        <Row>
          {requests.map((request) => (
            <Col key={request._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    Service Provider: {request.sp_user_id}
                  </Card.Title>
                  <Card.Text>Description: {request.description}</Card.Text>
                  <Card.Text>Status: {request.req_status}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CRequests;

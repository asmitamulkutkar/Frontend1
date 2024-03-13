/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import CFooter from "./CFooter";
import Header from "../Header";
import CHeader from "./CHeader";

function CreateFeedback() {
  const { id } = useParams();
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role,setRole] = useState("")
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/service-providers/${id}`,
          {
            withCredentials: true,
          }
        );
        const serviceProviderData = response.data;

        if (serviceProviderData) {
          setUserName(serviceProviderData.username);
        } else {
          console.error("No service provider data found in the response.");
        }
      } catch (error) {
        console.error("Error fetching service provider data:", error);
      }
    };
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/profile`, {
          withCredentials: true,
        });
        const userData = response.data;

        if (userData) {
          setRole(userData.role);
          console.log(role);
        } else {
          console.error("No user data found in the response.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      
    };
    fetchUserRole()
    fetchUserData();
    
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const formData = {
        sp_user_id: id,
        rating: e.target.rating.value,
        comments: e.target.comments.value,
      };

      const response = await axios.post(
        "http://localhost:8000/feedback",
        formData,
        { withCredentials: true }
      );
      setLoading(false);
      if (response.data.message === "Success! New feedback created") {
        setSuccessMessage("Feedback submitted successfully");
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.error ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <>
    {role=="Client"?<CHeader/>:<Header/>}
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center mb-4">Give Feedback</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            {successMessage && (
              <p className="text-success text-center">{successMessage}</p>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="sp_user_id">
                <Form.Label>Service Provider</Form.Label>
                <div>
                  {username} (
                  <a
                    href={`/profile/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {id}
                  </a>
                  )
                </div>
              </Form.Group>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" name="rating" required />
              </Form.Group>
              <Form.Group controlId="comments">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" name="comments" required />
              </Form.Group>
              <div className="text-center mt-3">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateFeedback;

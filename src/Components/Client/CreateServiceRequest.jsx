/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CHeader from "./CHeader";
import CFooter from "./CFooter";

function CreateServiceRequest() {
  const { id } = useParams();
  const [username, setUserName] = useState("");
  const [formData, setFormData] = useState({
    sp_user_id: id,
    description: "",
    req_status: "Pending",
    time_date: new Date().toISOString(),
    service_request: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}`, {
          withCredentials: true,
        });
        const userData = response.data;

        if (userData) {
          setUserName(userData.username);
        } else {
          console.error("No user data found in the response.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/service-req",
        formData,
        { withCredentials: true }
      );
      setLoading(false);
      if (response.data.message === "Success! New service request created") {
        setSuccessMessage("Service request created successfully");
        setFormData({
          sp_user_id: id,
          description: "",
          req_status: "Pending",
          time_date: new Date().toISOString(),
          service_request: "",
        });
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
      <CHeader />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center mb-4">Create Service Request</h2>
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
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="service_request">
                <Form.Label>Service Request</Form.Label>
                <Form.Control
                  type="text"
                  name="service_request"
                  value={formData.service_request}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="mt-3"
                >
                  {loading ? "Creating Request..." : "Create Request"}
                </Button>
              </div>
              {error && <p className="text-danger mt-2">{error}</p>}
              {successMessage && (
                <p className="text-success mt-2">{successMessage}</p>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
      <CFooter />
    </>
  );
}

export default CreateServiceRequest;

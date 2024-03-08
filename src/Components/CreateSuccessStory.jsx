/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Form, Button, Col, Alert } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const CreateSuccessStory = () => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/user-stories",
        {
          media_url: mediaUrl,
          caption: caption,
        },
        { withCredentials: true }
      );
      // Show success message
      setShowSuccessMessage(true);
      // Clear input fields
      setMediaUrl("");
      setCaption("");
    } catch (error) {
      console.error("Error creating success story:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Col lg={8} className="mx-auto mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Create Success Story</h1>
              {showSuccessMessage && (
                <Alert
                  variant="success"
                  onClose={() => setShowSuccessMessage(false)}
                  dismissible
                >
                  Success story created successfully!
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formMediaUrl" className="mt-4">
                  <Form.Label>Media URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Media URL"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCaption" className="mt-4">
                  <Form.Label>Caption</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="d-block mx-auto mt-4"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default CreateSuccessStory;

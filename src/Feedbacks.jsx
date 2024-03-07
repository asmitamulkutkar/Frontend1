/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";

function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:8000/feedback/");
      
      setFeedbackList(response.data);
      console.log(feedbackList);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <>
      <>
        <Header />
        <Container className="mt-5">
          <h1 className="mb-4">All Feedbacks</h1>
          {Array.isArray(feedbackList) && feedbackList.length > 0 ? (
            <ListGroup className="mt-3">
              {feedbackList.map((feedback, index) => (
                <ListGroup.Item key={index}>
                  <strong>User:</strong> {feedback.sp_user_id}
                  <br />
                  <strong>Rating:</strong> {feedback.rating}
                  <br />
                  <strong>Comments:</strong> {feedback.comments}
                  <br />
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No feedback available</p>
          )}
        </Container>
      </>
      <Footer />
    </>
  );
}

export default FeedbackList;

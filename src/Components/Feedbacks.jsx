/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";
import CHeader from "./Client/CHeader";

function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [role,setRole] =  useState("");

  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [role]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:8000/feedback/", {
        withCredentials: true,
      });

      setFeedbackList(response.data);
      console.log(feedbackList);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <>
      <>
      {role=="Client"?<CHeader/>:<Header/>}
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
    </>
  );
}

export default FeedbackList;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";

function UserStoryList() {
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    fetchUserStories();
  }, []);

  const fetchUserStories = async () => {
    try {
      console.log("Hello");
      const response = await axios.get("http://localhost:8000/user-stories", {
        withCredentials: true,
      });
      setUserStories(response.data);
    } catch (error) {
      console.error("Error fetching user stories:", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h1 className="mb-4">Success Stories</h1>
        {Array.isArray(userStories) && userStories.length > 0 ? (
          <ListGroup className="mt-3">
            {userStories.map((story, index) => (
              <ListGroup.Item key={index}>
                <strong>User ID:</strong> {story.user_id}
                <br />
                <strong>Media URL:</strong> {story.media_url}
                <br />
                <strong>Caption:</strong> {story.caption}
                <br />
                <strong>Date:</strong> {story.date}
                <br />
                <strong>View Count:</strong> {story.view_count}
                <br />
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No success stories available</p>
        )}
      </Container>
    </>
  );
}

export default UserStoryList;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import CHeader from "./CHeader";

function UserStoryList() {
  const [userStories, setUserStories] = useState([]);
  const [role,setRole] = useState("")
  const [usernameMap, setUsernameMap] = useState({}); // Store username for each user ID
  useEffect(() => {
    fetchUserStories();
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

  const fetchUserStories = async () => {
    try {
      console.log("Hello");
      const response = await axios.get("http://localhost:8000/user-stories", {
        withCredentials: true,
      });
      setUserStories(response.data);
      console.log(response.data);
      fetchUsernames(response.data); // Fetch usernames for each user ID

    } catch (error) {
      console.error("Error fetching user stories:", error);
    }
  };

  const fetchUsernames = async (stories) => {
    const usernameMapCopy = { ...usernameMap };
    for (const story of stories) {
      try {
        const response = await axios.get(`http://localhost:8000/users/${story.user_id}`, {
          withCredentials: true,
        });
        usernameMapCopy[story.user_id] = response.data.username;
      } catch (error) {
        console.error("Error fetching username for user ID:", story.user_id, error);
      }
    }
    setUsernameMap(usernameMapCopy);
  };

  return (
    <>
      {role=="Client"?<CHeader/>:<Header/>}
      <Container className="mt-5">
        <h1 className="mb-4">Success Stories</h1>
        {Array.isArray(userStories) && userStories.length > 0 ? (
          <ListGroup className="mt-3">
            {userStories.map((story, index) => (
              <ListGroup.Item key={index}>
                <strong>User ID:</strong> {story.user_id}
                <br />
                <strong>User Name:</strong> {usernameMap[story.user_id] || "Loading..."}
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

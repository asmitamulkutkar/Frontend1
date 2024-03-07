/* eslint-disable no-unused-vars */
// UserStoryList.js

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component

const UserStoryList = () => {
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user-stories");
        setUserStories(response.data);
      } catch (error) {
        console.error("Error fetching user stories:", error);
      }
    };

    fetchUserStories();
  }, []);

  return (
    <div>
      <Header /> {/* Render Header component */}
      <div className="container">
        <h2>Success Stories</h2>
        <div className="row">
          {userStories.map((story) => (
            <div className="col-md-4 mb-4" key={story._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{story.caption}</Card.Title>
                  <Card.Text>Media URL: {story.media_url}</Card.Text>
                  <Card.Text>
                    Date: {new Date(story.date).toLocaleDateString()}
                  </Card.Text>
                  <Link to={`/user-stories/${story._id}`}>
                    <Button variant="primary">View Story</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer /> {/* Render Footer component */}
    </div>
  );
};

export default UserStoryList;

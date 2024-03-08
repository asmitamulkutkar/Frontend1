/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import CHeader from "./Client/CHeader";
import { useParams } from "react-router-dom";

const ViewUserProfile = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    firstname: "",
    lastname: "",
    gender: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}`, {
          withCredentials: true,
        });
        const userData = response.data;
        setUserInfo(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(!isEditing); // Toggle the editing state
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/users/${id}`, userInfo, {
        withCredentials: true,
      });
      setIsEditing(false); // Turn off editing mode after saving
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="d-flex flex-column h-100">
      <CHeader />
      <div className="container container flex-grow-1 overflow-auto">
        <div className="row">
          <div className="col-md-8 offset-md-2 mt-3">
            <Card>
              <Card.Body>
                <Card.Title>User Profile</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      value={userInfo.username}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={userInfo.email}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Location"
                      name="location"
                      value={userInfo.location}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFirstname">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Firstname"
                      name="firstname"
                      value={userInfo.firstname}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Lastname"
                      name="lastname"
                      value={userInfo.lastname}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={userInfo.gender}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
                {isEditing ? (
                  <Button variant="primary" onClick={handleSave}>
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleEdit}
                    className="mt-3"
                  >
                    {userInfo.username ? "Edit" : "Save"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfile;

import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer"; // Including Footer component
import { useParams } from "react-router-dom";

const ViewUserProfile = () => {
  const { id } = useParams();

  const [userInfo, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    firstname: "",
    lastname: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${id}`,
          { withCredentials: true }
        );
        const userData = response.data;
        console.log(userData);

        if (userData) {
          setInfo({
            username: userData.username || "",
            email: userData.email || "",
            password: userData.password || "",
            location: userData.location || "",
            firstname: userData.firstname || "",
            lastname: userData.lastname || "",
            gender: userData.gender || "",
          });
        } else {
          console.error("No user data found in the response.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id]); // Include id in the dependency array to re-fetch data when id changes

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container container flex-grow-1 overflow-auto">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <Card>
              <Card.Body>
                <Card.Title>Service Provider Profile</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      value={userInfo.username}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={userInfo.email}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Location"
                      value={userInfo.location}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formFirstname">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Firstname"
                      value={userInfo.firstname}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Lastname"
                      value={userInfo.lastname}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      value={userInfo.gender}
                      readOnly
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Footer /> {/* Including Footer component */}
    </div>
  );
};

export default ViewUserProfile;

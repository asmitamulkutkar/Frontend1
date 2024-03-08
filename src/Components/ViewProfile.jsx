/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";

import { useNavigate, useParams } from "react-router-dom";

const ViewProfile = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    council_bar_id: "",
    categories: "",
    edu_back: "",
    service_type: "",
    service_name: "",
    experience_years: 0,
  });
  const [userInfo, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    firstname: "",
    lastname: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleSendRequest = (sp_user_id) => {
    navigate(`/csrequest/${id}`);
  };

  const handleFeedback = () => {
    navigate(`/feedback/${id}`);
  };

  useEffect(() => {
    const fetchServiceProviderData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/service-providers/${id}`,
          { withCredentials: true }
        );
        const serviceProviderData = response.data;
        console.log(serviceProviderData);
        setFormData({
          council_bar_id: serviceProviderData.council_bar_id || "",
          categories: serviceProviderData.categories || "",
          edu_back: serviceProviderData.edu_back || "",
          service_type: serviceProviderData.service_type || "",
          service_name: serviceProviderData.service_name || "",
          experience_years: serviceProviderData.experience_years || 0,
          // username: serviceProviderData[0].username || "",
          // email: serviceProviderData[0].email || "",
          // password: serviceProviderData[0].password || "",
          // location: serviceProviderData[0].location || "",
          // firstname: serviceProviderData[0].firstname || "",
          // lastname: serviceProviderData[0].lastname || "",
          // gender: serviceProviderData[0].gender || "",
        });
      } catch (error) {
        console.error("Error fetching service provider data:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}`, {
          withCredentials: true,
        });
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

    fetchServiceProviderData();
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/service-providers/1`, formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error updating service provider:", error);
    }
    try {
      await axios.put(`http://localhost:8000/users/update-user`, userInfo, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error updating service provider:", error);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container container flex-grow-1 overflow-auto">
        <div className="row">
          <div className="col-md-8 offset-md-2"></div>
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
                    onChange={(e) =>
                      setInfo({ ...userInfo, username: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={userInfo.email}
                    readOnly
                    onChange={(e) =>
                      setInfo({ ...userInfo, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Location"
                    value={userInfo.location}
                    readOnly
                    onChange={(e) =>
                      setInfo({ ...userInfo, location: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formFirstname">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Firstname"
                    value={userInfo.firstname}
                    readOnly
                    onChange={(e) =>
                      setInfo({ ...userInfo, firstname: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formLastname">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Lastname"
                    value={userInfo.lastname}
                    readOnly
                    onChange={(e) =>
                      setInfo({ ...userInfo, lastname: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={userInfo.gender}
                    readOnly
                    onChange={(e) =>
                      setInfo({ ...userInfo, gender: e.target.value })
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formCouncilBarId">
                  <Form.Label>Council Bar ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Council Bar ID"
                    value={formData.council_bar_id}
                    readOnly
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        council_bar_id: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formCategories">
                  <Form.Label>Categories</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Categories"
                    value={formData.categories}
                    readOnly
                    onChange={(e) =>
                      setFormData({ ...formData, categories: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formEduBack">
                  <Form.Label>Education Background</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Education Background"
                    value={formData.edu_back}
                    readOnly
                    onChange={(e) =>
                      setFormData({ ...formData, edu_back: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formServiceType">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Service Type"
                    value={formData.service_type}
                    readOnly
                    onChange={(e) =>
                      setFormData({ ...formData, service_type: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formServiceName">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Service Name"
                    value={formData.service_name}
                    readOnly
                    onChange={(e) =>
                      setFormData({ ...formData, service_name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formExperienceYears">
                  <Form.Label>Experience Years</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.experience_years}
                    readOnly
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experience_years: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <div className="flex m-4">
                  <Button
                    className="m-2"
                    variant="primary"
                    onClick={() => handleSendRequest()}
                  >
                    Send Request
                  </Button>
                  <Button
                    className="m-2"
                    variant="primary"
                    onClick={() => handleFeedback()}
                  >
                    Feedback
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

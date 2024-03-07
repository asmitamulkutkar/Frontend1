/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const ServiceProviderProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    council_bar_id: "",
    categories: "",
    edu_back: "",
    service_type: "",
    service_name: "",
    experience_years: 0,
  });

  useEffect(() => {
    const fetchServiceProviderData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/service-providers/1`,
          { withCredentials: true }
        );
        const serviceProviderData = response.data;
        console.log(serviceProviderData);
        // Ensure that each field is populated with a default value if it's undefined
        setFormData({
          council_bar_id: serviceProviderData[0].council_bar_id || "",
          categories: serviceProviderData[0].categories || "",
          edu_back: serviceProviderData[0].edu_back || "",
          service_type: serviceProviderData[0].service_type || "",
          service_name: serviceProviderData[0].service_name || "",
          experience_years: serviceProviderData[0].experience_years || 0,
        });
      } catch (error) {
        console.error("Error fetching service provider data:", error);
      }
    };
  
    fetchServiceProviderData();
  }, []);
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8000/service-providers/1`,
        formData
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating service provider:", error);
    }
  };

  return (
    <div>
      <Header/>
      <Card>
        <Card.Body>
          <Card.Title>Service Provider Profile</Card.Title>
          <Form>
            <Form.Group controlId="formCouncilBarId">
              <Form.Label>Council Bar ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Council Bar ID"
                value={formData.council_bar_id}
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, council_bar_id: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategories">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Categories"
                value={formData.categories}
                readOnly={!isEditing}
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
                readOnly={!isEditing}
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
                readOnly={!isEditing}
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
                readOnly={!isEditing}
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
                readOnly={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, experience_years: e.target.value })
                }
              />
            </Form.Group>
            {isEditing ? (
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button variant="primary" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
      <Footer />
    </div>
  );
};

export default ServiceProviderProfile;

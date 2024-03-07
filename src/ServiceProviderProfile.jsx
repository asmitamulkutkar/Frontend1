/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";

const ServiceProviderProfile = ({ match }) => {
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
          `http://localhost:8000/service-providers/${match.params.id}`
        );
        const serviceProviderData = response.data;
        setFormData(serviceProviderData);
      } catch (error) {
        console.error("Error fetching service provider data:", error);
      }
    };

    fetchServiceProviderData();
  }, [match.params.id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8000/service-providers/${match.params.id}`,
        formData
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating service provider:", error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default ServiceProviderProfile;

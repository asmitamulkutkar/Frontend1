/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ServiceProviderList = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/service-providers"
        );
        setServiceProviders(response.data);
      } catch (error) {
        console.error("Error fetching service providers:", error);
      }
    };

    fetchServiceProviders();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredServiceProviders = serviceProviders.filter(
    (provider) =>
      provider.service_name &&
      provider.service_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Service Providers</h2>
        <Form.Group controlId="search" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search Service Provider"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Form.Group>
        <div className="row">
          {filteredServiceProviders.map((provider) => (
            <div className="col-md-4 mb-4" key={provider._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{provider.service_name}</Card.Title>
                  <Card.Text>{provider.categories.join(", ")}</Card.Text>
                  <Link to={`/profile/${provider._id}`}>
                    <Button variant="primary">View Profile</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceProviderList;

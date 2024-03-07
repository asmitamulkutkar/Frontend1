/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

function CreateServiceRequest() {
  const [formData, setFormData] = useState({
    sp_user_id: "",
    description: "",
    req_status: "Pending",
    time_date: new Date().toISOString(),
    service_request: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Assuming you have an API endpoint for creating service requests
      const response = await axios.post(
        "http://localhost:8000/service-req",
        formData
      );
      setLoading(false);
      if (response.data.message === "Success! New service request created") {
        // Handle success, maybe show a success message or redirect the user
        console.log("Service request created successfully");
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.error ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="container">
      <h2>Create Service Request</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="sp_user_id" className="form-label">
            Service Provider ID
          </label>
          <input
            type="text"
            className="form-control"
            id="sp_user_id"
            name="sp_user_id"
            value={formData.sp_user_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="service_request" className="form-label">
            Service Request
          </label>
          <input
            type="text"
            className="form-control"
            id="service_request"
            name="service_request"
            value={formData.service_request}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating Request..." : "Create Request"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateServiceRequest;

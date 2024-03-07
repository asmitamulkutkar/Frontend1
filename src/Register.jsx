/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    // User attributes
    username: "",
    email: "",
    password: "",
    location: "",
    firstname: "",
    lastname: "",
    gender: "male", // Default gender
    birth_date: "",
    role: "Service Provider", // Default role

    // Service Provider attributes
    council_bar_id: "",
    categories: "",
    skills: "",
    edu_back: "",
    service_type: "",
    service_name: "",
    experience_years: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    setError(""); // Reset any previous errors

    try {
      // Form validation is now done by the browser due to the 'required' attribute in input fields
      const response = await axios.post(
        "http://localhost:8000/users/register",
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 409) {
        setError(
          "User already exists. Please try again with a different username or email."
        );
      } else {
        setError(
          err.response?.data?.error ||
            "An error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <div className="container-fluid bg-secondary min-vh-100 d-flex justify-content-center align-items-center pt-4 pb-4">
      <div className="bg-white p-4 rounded w-75  mx-auto">
        <h2 className="text-center mb-4">
          <strong>Register</strong>
        </h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <label className="form-label me-2">
              <strong>Role</strong>
            </label>
            <div className="form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="serviceProviderRadio"
                value="Service Provider"
                checked={formData.role === "Service Provider"}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="serviceProviderRadio"
              >
                Service Provider
              </label>
            </div>
          </div>
          {/* User fields */}
          {formData.role === "Service Provider" && (
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstname" className="form-label">
                  <strong>First Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Enter First Name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastname" className="form-label">
                  <strong>Last Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Enter Last Name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="gender" className="form-label">
                  <strong>Gender</strong>
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required // Field is required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="birth_date" className="form-label">
                  <strong>Birth Date</strong>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birth_date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="username" className="form-label">
                  <strong>Username</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="location" className="form-label">
                  <strong>Location</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  placeholder="Enter Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
            </div>
          )}
          {/* Service Provider fields */}
          {formData.role === "Service Provider" && (
            <div className="row g-3 mt-4">
              <div className="col-md-6">
                <label htmlFor="council_bar_id" className="form-label">
                  <strong>Council/Bar ID</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="council_bar_id"
                  placeholder="Enter Council/Bar ID"
                  name="council_bar_id"
                  value={formData.council_bar_id}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="categories" className="form-label">
                  <strong>Categories</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categories"
                  placeholder="Enter Categories"
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="skills" className="form-label">
                  <strong>Skills</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="skills"
                  placeholder="Enter Skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="edu_back" className="form-label">
                  <strong>Educational Background</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edu_back"
                  placeholder="Enter Educational Background"
                  name="edu_back"
                  value={formData.edu_back}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="service_type" className="form-label">
                  <strong>Service Type</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="service_type"
                  placeholder="Enter Service Type"
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="service_name" className="form-label">
                  <strong>Service Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="service_name"
                  placeholder="Enter Service Name"
                  name="service_name"
                  value={formData.service_name}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="experience_years" className="form-label">
                  <strong>Experience Years</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="experience_years"
                  placeholder="Enter Experience Years"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleChange}
                  required // Field is required
                />
              </div>
            </div>
          )}
          <div className="row mt-3">
            <div className="col-md-6 offset-md-3">
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        </form>
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login">
            <strong>Login</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

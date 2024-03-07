import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    firstname: "",
    lastname: "",
    gender: "male", // Default gender
    birth_date: "",
    role: "Client",
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
      // Redirect to login page after successful registration
      // Optionally, you can redirect the user here
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
            "An error occured. Please try again later."
        );
      }
    }
  };

  return (
    <div className="container-fluid bg-secondary min-vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-5 rounded w-75">
        <h2 className="text-center mb-4">Register</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6 offset-md-3">
              <div className="d-flex justify-content-center">
                <label className="form-label me-2">
                  <strong>Role</strong>
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="clientRadio"
                    value="Client"
                    checked={formData.role === "Client"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="clientRadio">
                    Client
                  </label>
                </div>
              </div>
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required // Field is required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="firstname" className="form-label">
                <strong>First Name</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="Enter First Name"
                autoComplete="off"
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
                autoComplete="off"
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
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="birth_date" className="form-label">
                <strong>Date of Birth</strong>
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
          </div>
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
          Already Have an Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      const response = await axios.post(
        "http://localhost:8000/users/login",
        formData
      );
      setLoading(false);
      if (response.data.message === "User logged-in Successfully!") {
        navigate("/home"); // Redirect to home page
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
    <div className="container-fluid bg-secondary min-vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-5 rounded w-50">
        <h2 className="text-center mb-4">Login</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username or Email" className="form-label">
              <strong>Username or Email</strong>
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
          <div className="mb-3">
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
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success w-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-3 text-center">
          <p>Does not have an account yet?</p>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate("/register")}
            >
              Register as Client
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/registerSp")}
            >
              Register as Service Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

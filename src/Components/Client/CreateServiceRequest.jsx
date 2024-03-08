import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function CreateServiceRequest() {
    const { id } = useParams();
    const [username, setUserName] = useState("");
    const [formData, setFormData] = useState({
        sp_user_id: id,
        description: "",
        req_status: "Pending",
        time_date: new Date().toISOString(),
        service_request: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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
                    setUserName(userData.username);
                } else {
                    console.error("No user data found in the response.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Assuming you have an API endpoint for creating service requests
            const response = await axios.post(
                "http://localhost:8000/service-req",
                formData,
                { withCredentials: true }
            );
            setLoading(false);
            if (
                response.data.message === "Success! New service request created"
            ) {
                setSuccessMessage("Service request created successfully");
                setFormData({
                    sp_user_id: id,
                    description: "",
                    req_status: "Pending",
                    time_date: new Date().toISOString(),
                    service_request: "",
                });
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
            {successMessage && <p className="text-success">{successMessage}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="sp_user_id">
                    <Form.Label>Service Provider</Form.Label>
                    <div>
                        {username} (
                        <a
                            href={`/profile/${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {id}
                        </a>
                        )
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="service_request">
                    <Form.Label>Service Request</Form.Label>
                    <Form.Control
                        type="text"
                        name="service_request"
                        value={formData.service_request}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <div className="text-center">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? "Creating Request..." : "Create Request"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreateServiceRequest;

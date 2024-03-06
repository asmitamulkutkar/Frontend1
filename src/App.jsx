/* eslint-disable no-unused-vars */
// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import FeedbackForm from "./Feedbacks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registerSp" element={<Register />} />
        <Route path="/feedbacks" element={<FeedbackForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
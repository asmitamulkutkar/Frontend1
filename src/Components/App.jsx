/* eslint-disable no-unused-vars */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import FeedbackForm from "./Feedbacks";
import ServiceRequestList from "./ServiceRequestList";
import ServiceProviderList from "./ServiceProviderList";

import ServiceProviderProfile from "./ServiceProviderProfile";
import CHeader from "./Client/CHeader";
import CFooter from "./Client/CFooter";
import CHome from "./Client/CHome";
import CSearch from "./Client/CSearch";
import CRequests from "./Client/CRequests";
import CreateServiceRequest from "./Client/CreateServiceRequest";
import ViewProfile from "./ViewProfile";
import ViewUserProfile from "./ViewUser";

import CreateFeedback from "./Client/CreateFeedback";
import CreateSuccessStory from "./CreateSuccessStory";
import UserStoryList from "./Client/UserStoryList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registerSp" element={<Register />} />
        <Route path="/feedbacks" element={<FeedbackForm />} />
        <Route path="/serviceRequest" element={<ServiceRequestList />} />
        <Route path="/serviceProviderList" element={<ServiceProviderList />} />

        <Route
          path="/service-providers/:id"
          element={<ServiceProviderProfile />}
        />
        <Route path="/profile/:id" element={<ViewProfile />} />
        <Route path="/userprofile/:id" element={<ViewUserProfile />} />
        <Route path="/cheader" element={<CHeader />} />
        <Route path="/cfooter" element={<CFooter />} />
        <Route path="/chome" element={<CHome />} />
        <Route path="/csearch" element={<CSearch />} />
        <Route path="/csrequest/:id" element={<CreateServiceRequest />} />
        <Route path="/feedback/:id" element={<CreateFeedback />} />
        <Route path="/userstories/:id" />
        <Route path="/crequests" element={<CRequests />} />
        <Route path="/spProfile" element={<ServiceProviderProfile />} />
        <Route path="/successStories" element={<CreateSuccessStory />} />
        <Route path="/user-stories" element={<UserStoryList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

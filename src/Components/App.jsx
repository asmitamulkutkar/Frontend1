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
import ServiceRequestList from "./ServiceRequestList";
import ServiceProviderList from "./ServiceProviderList";
import UserStoryList from "./UserStoryList";
import ServiceProviderProfile from "./ServiceProviderProfile";
import CHeader from "./Client/CHeader";
import CFooter from "./Client/CFooter";
import CHome from "./Client/CHome";
import CSearch from "./Client/CSearch";
import CreateServiceRequest from "./Client/CreateServiceRequest";
import ViewProfile from "./ViewProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registerSp" element={<Register />} />
        <Route path="/feedbacks" element={<FeedbackForm />} />
        <Route path="/serviceRequest" element={<ServiceRequestList />} />
        <Route path="/serviceProviderList" element={<ServiceProviderList />} />
        <Route path="/userStories" element={<UserStoryList />} />
        <Route
          path="/service-providers/:id"
          element={<ServiceProviderProfile />}
        />
        <Route path="/profile/:id" element={<ViewProfile />} />
        <Route path="/cheader" element={<CHeader />} />
        <Route path="/cfooter" element={<CFooter />} />
        <Route path="/chome" element={<CHome />} />
        <Route path="/csearch" element={<CSearch />} />
        <Route path="/csrequest" element={<CreateServiceRequest />} />
        <Route path="/spProfile" element={<ServiceProviderProfile/>}/>
         </Routes>
    </BrowserRouter>
  );
}

export default App;
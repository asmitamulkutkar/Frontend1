/* eslint-disable no-unused-vars */
// Home.jsx
import React from "react";
import CHeader from "./CHeader";
import CFooter from "./CFooter";
import UserStoriesSlider from "../UserStoriesSlider";

function CHome() {
  return (
    <div>
      <CHeader />
      <UserStoriesSlider />
      <CFooter />
    </div>
  );
}

export default CHome;

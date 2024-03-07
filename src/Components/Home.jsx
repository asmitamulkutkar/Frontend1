/* eslint-disable no-unused-vars */
// Home.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserStoriesSlider from "./UserStoriesSlider";

function Home() {
  return (
    <div>
      <Header />
      {/* Your Home page content goes here */}
      <UserStoriesSlider></UserStoriesSlider>
      <Footer />
    </div>
  );
}

export default Home;

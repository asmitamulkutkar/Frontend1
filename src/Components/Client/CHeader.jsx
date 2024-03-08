/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

function CHeader() {
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#9195F6" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/logo.png" alt="Logo" height="30" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/chome">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/csearch">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/crequests">
                  Requests
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">
                  <i className="bi bi-bell"></i> Notification
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/spProfile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default CHeader;

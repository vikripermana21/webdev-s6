import { useState } from "react";
import "./App.css";
import Topbar from "./components/topbar";
import backgroundImage from "./assets/bg-landingpage.jpg";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
      <Topbar />
      {/* Hero Section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome!</h1>
            <p className="mb-5">
              PolbanEduStaff is a special website that contains data on
              lecturers at the Bandung State Polytechnic Campus
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/dosen`)}
            >
              Get Started!
            </button>
          </div>
        </div>
      </div>
      {/* End of Hero Section */}
    </div>
  );
}

export default App;

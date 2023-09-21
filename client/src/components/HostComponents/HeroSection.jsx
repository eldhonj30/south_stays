import React, { useContext } from "react";
import EarningsSlider from "./EarningsSlider";
import { UserContext } from "../../Contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HeroSection = () => {
  const { setHost,host } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post("/host/logout").then(() => {
      console.log("hai");
      setHost(null);
      navigate("/host");
    });
  };

  return (
    <section className=" border-gray-300 py-20" style={{ paddingTop: "10rem" }}>
      <div className="container mx-auto px-4 text-center">
        {host?.name ? (
          <h2 className="text-3xl font-semibold mb-4">Welcome {host.name}</h2>
        ) : (
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to Hosting on South Stays
          </h2>
        )}
        <p className="text-gray-600">
          Share your extra space and earn money as South Stay's host.
        </p>
        {host?.name ? (
          <Link>
            <button onClick={handleLogout} className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              Logout
            </button>
          </Link>
        ) : (
          <Link to={"/host/register"}>
            <button className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              Get Started
            </button>
          </Link>
        )}
        <div className="py-5" style={{ height: "200px" }}>
          <EarningsSlider />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

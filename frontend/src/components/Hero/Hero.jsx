import React from "react";
import "./Hero.css";
import handIcon from "../Assets/hand-icon.png";
import arrowIcon from "../Assets/arrow-icon.jpg";
import heroImage from "../Assets/hero-icon.png";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hero-title">
          <h1>
            new <img src={handIcon} alt="hand" className="hand-icon" />
          </h1>
          <p>collections</p>
          <p>for everyone</p>
        </div>

        <button className="hero-button">
          Latest Collection <img src={arrowIcon} alt="arrow" className="arrow-icon" />
        </button>
      </div>

      <div className="hero-right">
        <img src={heroImage} alt="hero" className="hero-img" />
      </div>
    </div>
  );
}

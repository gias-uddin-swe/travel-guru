import React from "react";
import "./HomePage.css";
import image1 from "../../image/Frame.png";
import image2 from "../../image/Frame-1.png";
import image3 from "../../image/Frame-2.png";
import image4 from "../../image/Group.png";
import { Link } from "react-router-dom";
const HomePage = () => {
  const bus = "bus";
  const train = "train";
  const car = "car";
  const bike = "bike";
  return (
    <div className="home-page container">
      <div className="row">
        <div className="col-lg-3 col-md-6 image-link">
          <div className="main-image">
            <Link to={`/destination/${bike}`}>
              <img src={image1} alt="" />
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 image-link">
          <div className="main-image">
            <Link to={`/destination/${bus}`}>
              <img src={image2} alt="" />
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 image-link">
          <div className="main-image">
            <Link to={`/destination/${car}`}>
              <img src={image3} alt="" />
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 image-link">
          <div className="main-image">
            <Link to={`/destination/${train}`}>
              <img src={image4} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

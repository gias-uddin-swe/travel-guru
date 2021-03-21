import React, { useEffect, useState } from "react";
import "./HomePage.css";
import data from "../../FakeData/homeFakeData.json";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    setProduct(data);
  }, []);
  console.log(product);
  return (
    <div className="home-page container">
      <div className="row">
        {product.map((pd) => (
          <div className="col-lg-3 col-md-6 image-link">
            <div className="main-image">
              <Link to={`/destination/${pd.name}`}>
                <img src={pd.photoURl} alt="" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

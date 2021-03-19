import React, { useEffect, useState } from "react";
import map from "../../image/Map.png";
import "./Destination.css";
import { Form, FormControl } from "react-bootstrap";
import { useParams } from "react-router";
import fakeData from "../../FakeData/FakeData.json";
import { Link } from "react-router-dom";
import image from "../../image/Frame-1.png";
import people from "../../image/peopleicon.png";

const Destination = (props) => {
  const [show, setShow] = useState(true);
  console.log(show);
  const { name } = useParams();
  console.log(name);
  const [location, setLocation] = useState({
    from: "",
    to: "",
    date: "",
  });
  const handleBlur = (e) => {
    if (e.target.name === "from") {
      const userInfo = { ...location };
      userInfo[e.target.name] = [e.target.value];
      setLocation(userInfo);
    }
    if (e.target.name === "to") {
      const userInfo = { ...location };
      userInfo[e.target.name] = [e.target.value];
      setLocation(userInfo);
    }
    if (e.target.name === "date") {
      const userInfo = { ...location };
      userInfo[e.target.name] = [e.target.value];
      setLocation(userInfo);
    }
  };

  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult(fakeData);
  }, []);
  const data = result.filter((pd) => pd.name === name);
  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="search-box">
            {show ? (
              <form action="">
                <label className="mt-3">pick from</label>
                <br />
                <input
                  onBlur={handleBlur}
                  type="text"
                  placeholder="from"
                  name="from"
                  required
                />
                <br />
                <label className="mt-3">pick to</label>
                <br />
                <input
                  onBlur={handleBlur}
                  name="to"
                  type="text"
                  placeholder="to"
                  required
                />
                <br />
                <input
                  onBlur={handleBlur}
                  className="mt-4"
                  type="date"
                  name="date"
                  id=""
                />
                <br />

                <input
                  onClick={() => setShow(false)}
                  style={{ width: "70%" }}
                  className="btn btn-info mt-3"
                  type="submit"
                  value="Search"
                />
              </form>
            ) : (
              <div className="search-result row">
                <div className="col-sm-12 orange-part">
                  <h3>{location.from[0]}</h3>
                  <h3>{location.to[0]}</h3>
                  <p>{location.date[0]}</p>
                </div>
                <div className="col-sm-12 all-result">
                  {data.map((pd) => (
                    <div className="bottom mt-4  row">
                      <div className="result-img  d-flex">
                        <img src={pd.picURL} alt="" />
                        <p>{pd.name}</p>
                      </div>
                      <div className="text-icon-area d-flex ">
                        <p>
                          <img style={{ width: "20px" }} src={people} alt="" />{" "}
                          {pd.seat}
                        </p>
                      </div>
                      <div className="price col-sm-1">
                        <h6>${pd.price}</h6>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShow(true)}
                    style={{ width: "70%" }}
                    className="btn btn-info mt-3"
                    type="submit"
                    value="Search"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-8 col-md-6 map-img">
          <img src={map} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Destination;

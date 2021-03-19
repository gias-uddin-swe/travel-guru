import React from "react";
import map from "../../image/Map.png";
import "./Destination.css";
import { Form, FormControl } from "react-bootstrap";
import { useParams } from "react-router";
const Destination = (props) => {
  const { name } = useParams();
  console.log(name);

  const buss = [
    {
      name: "bus",
      seat: 6,
      price: 1100,
      picURL: "",
      id: 1,
    },
    {
      name: "bus",
      seat: 4,
      price: 500,
      picURL: "",
      id: 2,
    },
    {
      name: "bus",
      seat: 10,
      price: 100,
      picURL: "",
      id: 3,
    },
    {
      name: "bus",
      seat: 6,
      price: 1500,
      picURL: "",
      id: 4,
    },
    {
      name: "car",
      seat: 5,
      price: 1500,
      picURL: "",
      id: 6,
    },
    {
      name: "car",
      seat: 7,
      price: 1500,
      picURL: "",
      id: 8,
    },
    {
      name: "car",
      seat: 6,
      price: 1500,
      picURL: "",
      id: 9,
    },
    {
      name: "car",
      seat: 6,
      price: 1500,
      picURL: "",
      id: 10,
    },
    {
      name: "train",
      seat: 6,
      price: 1500,
      picURL: "",
      id: 11,
    },
    {
      name: "train",
      seat: 6,
      price: 1500,
      picURL: "",
      id: 12,
    },
    {
      name: "train",
      seat: 6,
      price: 1500,
      picURL: "",
      id: 13,
    },
  ];

  return (
    <div>
      <h1>This is destination</h1>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="search-box">
            <label className="mt-3">pick from</label>
            <br />
            <input type="text" placeholder="from" />
            <br />
            <label className="mt-3">pick to</label>
            <br />
            <input type="text" placeholder="to" />
            <br />
            <input className="mt-4" type="date" name="date" id="" />
            <br />
            <button style={{ width: "70%" }} className="btn btn-info mt-3">
              Search
            </button>
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

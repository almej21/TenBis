import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./restaurant.css";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const axios = require("axios").default;

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/restaurant/${id}`)
      .then((res) => {
        setRestaurant(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <div className="restaurant-page">
        <h1>{restaurant.name}</h1>
        <h2>{restaurant.email}</h2>
        <h2>rating: {restaurant.rating}</h2>
        <div className="menu-list">
          {restaurant.menu &&
            restaurant.menu.map((item) => {
              return (
                <div className="menu-item" key={item.name}>
                  <h3>{item.name}</h3>
                  <h4>{item.description}</h4>
                  <h4>price: {item.price}</h4>
                  <IconButton
                    aria-label="add"
                    size="large"
                    style={{
                      "align-self": "center", //makes btn center horizontally
                      "margin-top": "auto", //makes btn place at the bottom of div
                    }}
                  >
                    <AddCircleIcon fontSize="inherit" />
                  </IconButton>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

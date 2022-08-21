import React, { useEffect, useState } from "react";
import { Search } from "components/Search/Search";
import "./imhungry.css";
const axios = require("axios").default;

export default function ImHungry() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/customer/restaurantssearch")
      .then((res) => {
        setRestaurants(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function HandleSearch() {
    var allRestaurants = document.getElementsByClassName(
      "restaurant-container"
    );
    var input = document.getElementById("search");

    var arr = Array.from(allRestaurants);
    arr.forEach((restaurant) => {
      restaurant.hidden = true;
    });

    arr.forEach((element) => {
      var name = element.getAttribute("restaurantName");
      if (name.includes(input.value)) {
        element.hidden = false;
      }
    });
  }

  return (
    <>
      <div className="search-container">
        <Search
          placeholder="Search for restaurants..."
          handleSearch={HandleSearch}
        />

        {restaurants.map((restaurant) => {
          return (
            <div
              className="restaurant-container"
              hidden={false}
              restaurantName={restaurant.name}
            >
              <h1 className="restaurant-name">{restaurant.name}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

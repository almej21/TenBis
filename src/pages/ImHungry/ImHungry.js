import React, { useEffect, useState } from "react";
import { Search } from "components/Search/Search";
import "./imhungry.css";
import { Link } from "react-router-dom";
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

  const handleSearch = () => {
    var allRestaurants = document.getElementsByClassName(
      "restaurant-container"
    );
    var input = document.getElementById("restaurant_search");

    var arr = Array.from(allRestaurants);
    arr.forEach((restaurant, i) => {
      // restaurant.hidden = true;
      allRestaurants[i].hidden = true;
    });

    arr.forEach((element) => {
      var name = element.getAttribute("restaurantname");
      if (name.includes(input.value)) {
        element.hidden = false;
      }
    });
  };

  return (
    <>
      <div className="search_page">
        <div className="search_input">
          <Search
            placeholder="Search for restaurants..."
            handlesearch={handleSearch}
          />
        </div>
        <div className="restaurants_list">
          {restaurants.map((restaurant) => {
            return (
              <div
                className="restaurant-container"
                hidden={false}
                restaurantname={restaurant.name}
                key={restaurant.id}
              >
                <Link className="link" to={`/restaurant/${restaurant.id}`}>
                  {restaurant.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

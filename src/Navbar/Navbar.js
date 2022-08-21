import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// import Search from "../components/Search/Search";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((state) => state.userInfo.value);
  const [loggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    setLoggedIn(userInfo.is_logged_in);
  }, [userInfo]);

  return (
    <div className="Navbar">
      <span className="nav-logo">ALMOG</span>
      <div className={`nav-items ${isOpen && "open"}`}>
        <li className="active ">
          <Link className="link" to="/login">
            {loggedIn ? "LOGOUT" : "LOGIN"}
          </Link>
        </li>
        <li>
          <Link className="link" to="/imhungry">
            I'M HUNGRY
          </Link>
        </li>
        <li>
          <Link className="link" to="/userinfo">
            USER INFO
          </Link>
        </li>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;

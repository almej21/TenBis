/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./login.css";
import InputCom from "../../components/Input/InputCom";
import ButtonCom from "../../components/Button/ButtonCom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/userInfo";
import { Link } from "react-router-dom";
import SnackBar from "components/SnackbarMUI/SnackBar";
const axios = require("axios").default;

export default function Login() {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  const userInfo = useSelector((state) => state.userInfo.value);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  var passInputComponent = document.getElementById("user_pass-input");
  var userNameInputComponent = document.getElementById("user_name-input");
  // console.log(inputComponent);

  var shakePassInput = function () {
    passInputComponent.classList.add("error");
  };

  var shakeUserNameInput = function () {
    userNameInputComponent.classList.add("error");
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/customer/userinfo", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(login({ ...res.data, is_logged_in: true }));
          console.log("login page rerender");
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoggedIn(userInfo.is_logged_in);
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("user_name-input").value,
      password: document.getElementById("user_pass-input").value,
    };
    axios
      .post("http://localhost:4000/customer/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(login({ ...res.data, is_logged_in: true }));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          shakePassInput();
        }
        if (err.response.status === 404) {
          shakeUserNameInput();
        }
        console.log(err);
      });
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    dispatch(logout());

    axios
      .get("http://localhost:4000/customer/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(logout());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-page">
      {loggedIn ? (
        <div className="logged-in">
          <ButtonCom onClick={handleLogOut} btnValue="LOGOUT"></ButtonCom>
        </div>
      ) : (
        <div className="login-form">
          <div className="login-div">
            <form id="login-form">
              <InputCom
                inputType="text"
                placeholder="Email address"
                id="user_name"
                inputId="user_name-input"
                className="input-com"
                setValue={setUserName}
                value={userName}
              />
              <InputCom
                inputType="password"
                placeholder="Password"
                id="user_pass"
                inputId="user_pass-input"
                className="input-com"
                setValue={setPass}
                value={pass}
              />
              <ButtonCom onClick={handleSubmit} btnValue="LOGIN"></ButtonCom>
            </form>
            <Link className="link" to="/register">
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      )}
      <SnackBar />
    </div>
  );
}

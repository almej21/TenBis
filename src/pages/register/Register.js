/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./register.css";
import InputCom from "../../components/Input/InputCom";
import ButtonCom from "../../components/Button/ButtonCom";
import { Link } from "react-router-dom";
const axios = require("axios").default;

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user_name: document.getElementById("register_user_name-input").value,
      email: document.getElementById("register_email-input").value,
      password: document.getElementById("register_pass-input").value,
    };
    axios
      .post("http://localhost:4000/customer/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert("you've registered successfully! Login to start using the app");
        // const form = document.querySelector("#login-form");
        // const inputFields = form.childNodes;
        // inputFields.forEach((input) => {
        //   input.value = "";
        // });
        setUserName("");
        setEmail("");
        setPass("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-form">
      <div className="login-div">
        <form id="login-form" onSubmit={handleSubmit}>
          <InputCom
            inputType="text"
            placeholder="User name"
            id="user_name"
            inputId="register_user_name-input"
            className="input-com"
            setValue={setUserName}
            value={userName}
          />
          <InputCom
            inputType="text"
            placeholder="Email address"
            id="email"
            inputId="register_email-input"
            className="input-com"
            setValue={setEmail}
            value={email}
          />
          <InputCom
            inputType="password"
            placeholder="Password"
            id="user_pass"
            inputId="register_pass-input"
            className="input-com"
            setValue={setPass}
            value={pass}
          />
          <ButtonCom onClick={handleSubmit} btnValue="Register"></ButtonCom>
        </form>
        <Link className="link" to="/login">
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
}

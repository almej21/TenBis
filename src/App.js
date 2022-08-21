/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import React from "react";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ImHungry from "./pages/ImHungry/ImHungry";
import Userinfo from "./pages/userinfo/Userinfo";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <img
          className="bg"
          src="https://image.winudf.com/v2/image1/Y29tLndhbGxwYXBlcnN3b3JsZC53b29kX3NjcmVlbl8wXzE1NTYyMDE3NzdfMDQ1/screen-0.jpg?fakeurl=1&type=.jpg"
          alt="background"
        ></img>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/imhungry" element={<ImHungry />} />
          <Route path="/userinfo" element={<Userinfo />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

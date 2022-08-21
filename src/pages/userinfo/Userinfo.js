import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../features/userInfo";
import "./userinfo.css";

const axios = require("axios").default;

export default function Userinfo() {
  const userInfo = useSelector((state) => state.userInfo.value);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4000/customer/userinfo", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(login({ ...res.data, is_logged_in: true }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  return (
    <>
      {userInfo.is_logged_in ? (
        <div className="logged-in-user-info">
          <h1>{userInfo.user_name}</h1>
          <h2>{userInfo.email}</h2>
          <h2>Member since: {userInfo.member_since}</h2>
          <h2>ID: {userInfo.user_id}</h2>
          <h2>Balance: {userInfo.balance}</h2>
          <h2>Orders history: {userInfo.orders_history}</h2>
          <h2>Favorite restaurants: {userInfo.favorite_restaurants}</h2>
        </div>
      ) : (
        <h1>please Login to view Info</h1>
      )}
    </>
  );
}

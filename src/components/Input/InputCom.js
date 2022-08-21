import React from "react";
import "./inputCom.css";
import { useEffect, useState } from "react";

export default function InputCom(props) {
  useEffect(() => {
    var inputCom = document.getElementById(props.inputId);
    // console.log(inputCom);
    var removeError = function () {
      inputCom.classList.remove("error");
    };
    removeError();
  });

  return (
    <div className="input-component">
      <div className="input-group">
        <input
          type={props.inputType}
          id={props.inputId}
          required
          className={`input ${props.className}`}
          onChange={(event) => props.setValue(event.target.value)}
          // onChange={(event) => removeError()}
          value={props.value}
        ></input>
        <label className="input-label">{props.placeholder}</label>
      </div>
    </div>
  );
}

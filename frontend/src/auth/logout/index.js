import React from "react";
import { Link } from "react-router-dom";
import "../../static/css/auth/authButton.css";
import "../../static/css/auth/authPage.css";
import tokenService from "../../services/token.service";

const Logout = () => {
  function sendLogoutRequest() {
    const jwt = window.localStorage.getItem("jwt");
    if (jwt || typeof jwt === "undefined") {
      tokenService.removeUser();
      window.location.href = "/";
    } else {
      alert("There is no user logged in");
    }
  }

  return (
    <div className="auth-page-container">
      <div className="auth-form-container">
      <div className="recuadro-logout">
        <h2 className="text-center text-md">
          Are you sure you want to log out?
        </h2>
        <div className="options-row">
          <Link className="auth-button-cancelar" to="/" style={{textDecoration: "none"}}>
            Cancelar
          </Link>
          <button className="auth-button-aceptar" onClick={() => sendLogoutRequest()}>
            Aceptar
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Logout;

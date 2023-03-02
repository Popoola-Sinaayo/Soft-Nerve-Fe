import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import logo from "../logo.jpg";

function Header({ active }) {
  console.log(active);
  return (
    <header>
      <img src={logo} alt="" width={100} />
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={
                active === "home"
                  ? "nav-item border-b-2 border-red-500"
                  : "nav-item"
              }
            >
              Patients
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className={
                active === "create"
                  ? "nav-item border-b-2 border-red-500"
                  : "nav-item"
              }
            >
              Create
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

import React from "react";
import { useNavigate } from "react-router";
import patientImage from "../patient.webp";

function Card({ name, details, address, pinCode, id }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center ml-auto mr-auto w-11/12 justify-between shadow-gray-400 shadow-lg p-5 cursor-pointer mt-5 mb-5"
      onClick={() => navigate(`/update/${id}`)}
    >
      <div className="flex-1">
        <img src={patientImage} alt="patient" width={50} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg">Name</p>
        <p>{name}</p>
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg">Contact</p>
        <p>{details}</p>
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg">Address</p>
        <p>{address}</p>
      </div>
      <div className="flex-2">
        <p className="font-bold text-lg">Code</p>
        <p>{pinCode}</p>
      </div>
    </div>
  );
}

export default Card;

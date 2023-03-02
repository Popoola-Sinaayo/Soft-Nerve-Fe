import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../css/main.css";
import Card from "./Card";
import axios from "axios";
import UpdateCard from "./UpdateCard";

function Main() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios
      .get("https://node-intern-project.onrender.com/api/all-patients")
      .then((response) => {
        console.log(response.data.data);
        setDetails(response.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Header active="home" />
      <main>
        <h1 className="text-3xl font-bold p-10">All Patients Information</h1>
        {details.map((data) => {
          return (
            <Card
              key={data._id}
              address={data.address}
              details={data.contactDetails}
              pinCode={data.pinCode}
              name={data.name}
              id={data._id}
            />
          );
        })}
      </main>
    </div>
  );
}

export default Main;

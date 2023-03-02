import React, { useState } from "react";
import Header from "./Header";
import TextField from "@mui/material/TextField";
import { AlertTitle, Button } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router";
function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [details, setDetails] = useState();
  const [address, setAddress] = useState();
  const [code, setCode] = useState();
  const [alertDetails, setAlertDetails] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const handleData = (e) => {
    e.preventDefault();
    if (!name && !details && !address && !code) {
      showAlert(true);
      setAlertDetails("Please fill al data fields");
    } else {
      axios
        .post("https://node-intern-project.onrender.com/api/create", {
          name: name,
          contactDetails: details,
          address: address,
          pinCode: code,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.message === "success") {
            navigate("/");
          } else {
            setAlertDetails(response.data?.data);
            setShowAlert(true);
          }
        })
        .catch((error) => {
          setAlertDetails(error);
          setShowAlert(true);
        });
    }
  };
  return (
    <div>
      <Header active="create" />
      <main className="w-full">
        <h1 className="pt-10 pl-10 pb-10 font-bold text-xl">
          Create Patient Information
        </h1>

        <form className="ml-auto mr-auto w-1/2">
          {showAlert && (
            <Alert
              severity="error"
              className="mb-10"
              onClose={() => setShowAlert(false)}
            >
              <AlertTitle>Error</AlertTitle>
              <strong>
                {" "}
                {alertDetails ? alertDetails : "An error occurred"}{" "}
              </strong>
            </Alert>
          )}
          <div className="mb-5">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name || ""}
              onChange={(e) => {
                setName(e.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mb-5">
            <TextField
              id="outlined-basic"
              label="Contact Details"
              variant="outlined"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              fullWidth
            />
          </div>
          <div className="mb-5">
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            />
          </div>
          <div className="mb-5">
            <TextField
              id="outlined-basic"
              label="Pin Code"
              variant="outlined"
              type="number"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
            />
          </div>
          <Button variant="contained" fullWidth onClick={handleData}>
            Create
          </Button>
        </form>
      </main>
    </div>
  );
}

export default Create;

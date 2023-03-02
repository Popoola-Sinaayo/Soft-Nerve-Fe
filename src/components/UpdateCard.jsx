import React, { useEffect, useState } from "react";
import Header from "./Header";
import TextField from "@mui/material/TextField";
import { AlertTitle, Button } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router";

function UpdateCard({
  currentName,
  currentAddress,
  currentCode,
  currentDetails,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState(currentName);
  const [details, setDetails] = useState(currentDetails);
  const [address, setAddress] = useState(currentAddress);
  const [code, setCode] = useState(currentCode);
  const [alertDetails, setAlertDetails] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const fetchInfo = async () => {
    const response = await axios.get(`https://node-intern-project.onrender.com/api/patient/${id}`);
    const data = response.data;
    console.log(data);
    setName(data?.patient?.name);
    setAddress(data?.patient?.address);
    setCode(data?.patient?.pinCode);
    setDetails(data?.patient?.contactDetails);
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await axios.post(`https://node-intern-project.onrender.com/api/delete/${id}`);
    const data = response.data;
    if (data.message === "success") {
      navigate("/");
    }
  };
  const handleData = (e) => {
    e.preventDefault();
    if (!name && !details && !address && !code) {
      showAlert(true);
      setAlertDetails("Please fill al data fields");
    } else {
      axios
        .put(`https://node-intern-project.onrender.com/api/update/${id}`, {
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
      <Header />
      <main className="w-full">
        <h1 className="pt-10 pl-10 pb-10 font-bold text-xl">
          Update {name} Patient Information
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
              defaultValue={name}
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
              value={details || ""}
              defaultValue={details}
              onChange={(e) => setDetails(e.target.value)}
              fullWidth
            />
          </div>
          <div className="mb-5">
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={address || ""}
              defaultValue={address}
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
              value={code || ""}
              defaultValue={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
            />
          </div>
          <div className="mb-5">
            <Button variant="contained" fullWidth onClick={handleData}>
              Update
            </Button>
          </div>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDelete}
          >
            Delete
          </Button>
        </form>
      </main>
    </div>
  );
}

export default UpdateCard;

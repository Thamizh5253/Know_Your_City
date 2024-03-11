import React, { useState } from "react";
import { toast } from "react-toastify";
import Ques from "./ques";

import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";

import "./pin.css";

const Pin = () => {
  const [pin, setPin] = useState("");
  const [pincodeData, setPincodeData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // console.log("close");
    setOpen(false);
  };

  const handlePinChange = (event) => {
    // console.log(pin);
    // Allow only numeric input
    const inputValue = event.target.value;

    // Limit the input to 6 digits
    const limitedInput = inputValue.slice(0, 6);

    // Update the state with the cleaned and limited input
    setPin(limitedInput);
  };
  const handleFetchClick = async () => {
    try {
      // Fetch data when the button is clicked
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pin}`
      );

      if (!response.ok) {
        toast.error("🪲 BUG While fetching data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          //   transition: Bounce,
        });
      }

      const data = await response.json();
      setPincodeData(data);
      console.log(data[0]?.Status);
      if (data[0]?.Status === "Error" || data[0]?.Status === "404") {
        toast.error("😔 Sorry, No Data Found", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          //   transition: Bounce,
        });
      } else {
        toast.success("➡️ Here is your Data!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });

        handleOpen();
      }
    } catch (error) {
      toast.error("Try Again, After Sometimes", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
      });
      console.error("Error fetching pincode data:", error);
    }
  };

  const renderTable = () => {
    // Check if pincodeData exists and has data
    if (!pincodeData || pincodeData.length === 0) {
      return <p>No pincode information available.</p>;
    }

    const postOffice = pincodeData[0]?.PostOffice;

    // If there are no post offices, return a message
    if (!postOffice || postOffice.length === 0) {
      return <p>No pincode information available.</p>;
    }

    // Extract column names from the first post office
    const columns = Object.keys(postOffice[0]);

    // Exclude columns to be removed
    const excludedColumns = [
      "Description",
      "BranchType",
      "DeliveryStatus",
      "Country",
      "Pincode",
      "Circle",
      "Division",
      "Region",
    ];
    const filteredColumns = columns.filter(
      (column) => !excludedColumns.includes(column)
    );

    return (
      <table className="table">
        <thead>
          <tr>
            {filteredColumns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {postOffice.map((office, rowIndex) => (
            <tr key={rowIndex}>
              {filteredColumns.map((column, colIndex) => (
                <td key={colIndex}>{office[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="con">
      <div className="head">
        <h1 className="heading">Know Your City</h1>
      </div>
      <div className="input">
        <div className="label">
          <label htmlFor="">Enter Your Pincode</label>
        </div>
        <div className="text">
          <input
            pattern="\d{6}"
            title="Please enter a 6-digit PIN code"
            type="number"
            placeholder="Pincode"
            onChange={handlePinChange}
            maxLength="6"
            value={pin}
          />
        </div>
        <div className="dbtn">
          <button className="btn" onClick={handleFetchClick}>
            Check
          </button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        {renderTable()}
      </Modal>
      <Ques></Ques>
    </div>
  );
};

export default Pin;

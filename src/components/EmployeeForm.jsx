import React, { useState } from "react";
import Select from "react-select";
import { formattedSelectStates, departmentList } from "../utils/lists";
import DataFormatter from "../utils/formatClass";
import { DatePicker } from "@mui/x-date-pickers";
import { Modal } from "alt_basic-modal";

export default function EmployeeForm({ setShowTable, setFormData }) {
  // Date state used fot both displaying the date in the picker and to save it to be used in the table
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new object with the user form data
    const data = new FormData(event.target);
    // Pass the data into the formatting class
    const formattedData = DataFormatter.formatFormData(data);
    // Making sure the dates are added correctly
    formattedData.dateOfBirth = dateOfBirth;
    formattedData.startDate = startDate;
    // setting the state of the parent component which will be used in the table
    setFormData((prevFormData) => [...prevFormData, formattedData]);
    // Opening cnfirmation modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="container">
        <button className="front-button" onClick={() => setShowTable(true)}>
          View current employees
        </button>
        <div className="box">
          <form onSubmit={handleSubmit} id="create-employee">
            <h2>Create Employee</h2>
            <label htmlFor="first-name">First Name</label>
            <input required type="text" id="first-name" name="firstName" />
            <label htmlFor="last-name">Last Name</label>
            <input required type="text" id="last-name" name="lastName" />
            <label htmlFor="date-of-birth">Date of Birth</label>
            <DatePicker
              required
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(newValue) => {
                setDateOfBirth(newValue);
              }}
              slotProps={{
                textField: { variant: "outlined", placeholder: "" },
              }}
            />
            <label htmlFor="start-date">Start Date</label>
            <DatePicker
              required
              id="startDate"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              slotProps={{
                textField: { variant: "outlined", placeholder: "" },
              }}
            />
            <label htmlFor="street">Street</label>
            <input
              required
              id="street"
              name="street"
              type="text"
              autoComplete="off"
            />

            <label htmlFor="city">City</label>
            <input
              required
              id="city"
              name="city"
              type="text"
              autoComplete="off"
            />

            <label htmlFor="state">State</label>
            <Select
              required
              options={formattedSelectStates}
              name="state"
              placeholder
              className="react-select-container"
              classNamePrefix="react-select"
            />
            <label htmlFor="zipCode">Zip Code</label>
            <input
              required
              id="zipCode"
              name="zipCode"
              type="number"
              min={0}
              autoComplete="off"
            />
            <label htmlFor="department">Department</label>
            <Select
              options={departmentList}
              name="department"
              placeholder
              className="react-select-container"
              classNamePrefix="react-select"
            />
            <button id="submit" className="front-button" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div id="confirmation" className="modal">
          Employee Created!
        </div>
      </Modal>
    </div>
  );
}

import React, { useState } from "react";
import Select from "react-select";
import { formattedSelectStates, departmentLsit } from "../utils/lists";
import DataFormatter from "../utils/formatClass";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Modal } from "alt_basic-modal";

export default function EmployeeForm({ setShowTable, setFormData }) {
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formattedData = DataFormatter.formatFormData(data);
    formattedData.dateOfBirth = dateOfBirth;
    formattedData.startDate = startDate;
    setFormData((prevFormData) => [...prevFormData, formattedData]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="container">
        <button onClick={() => setShowTable(true)}>
          View current employee
        </button>
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit} id="create-employee">
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
            renderInput={(params) => <TextField {...params} />}
          />

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            required
            id="startDate"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <fieldset className="address">
            <legend>Address</legend>
            <label htmlFor="street">Street</label>
            <input required id="street" name="street" type="text" />

            <label htmlFor="city">City</label>
            <input required id="city" name="city" type="text" />

            <label htmlFor="state">State</label>
            <Select required options={formattedSelectStates} name="state" />

            <label htmlFor="zipCode">Zip Code</label>
            <input required id="zipCode" name="zipCode" type="number" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <Select options={departmentLsit} name="department" />

          <button type="submit">Save</button>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div id="confirmation" className="modal">
          Employee Created!
        </div>
      </Modal>
    </div>
  );
}

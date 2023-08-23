import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [formData, setFormData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <div className="title">
          <h1>HRnet</h1>
        </div>
        <EmployeeForm setShowTable={setShowTable} setFormData={setFormData} />
        {showTable && (
          <div className="tableDisplay">
            <EmployeeTable data={formData} setShowTable={setShowTable} />
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default App;

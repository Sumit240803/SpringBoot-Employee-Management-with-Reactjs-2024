import "./App.css";
import { useState } from "react";

function App() {
  // All State Variables
  const [emp, setEmp] = useState([]);
  const [id, setId] = useState(0);
  const [employee, setEmployee] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpVisible, setIsEmpVisible] = useState(false);
  const [delId, setDelId] = useState(0);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    salary: "",
  });
  const [empForm, setEmpForm] = useState({
    name: "",
    role: "",
    salary: "",
  });
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // Function to show toast
  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000); // Hide after 3 seconds
  };


  // Getting All the Employees Function
  const getAllEmp = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employees", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setEmp(data);
        setEmployee(null);
        setIsVisible(false);
        setIsEmpVisible(false);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Finding Employee Function Using ID
  const empById = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/${id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
        setEmp([]);
        setIsVisible(false);
        setIsEmpVisible(false);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Employee Form Update
  const handleForm = () => {
    setIsVisible(!isVisible);
    setIsEmpVisible(false); // Hide add employee form when showing update form
  };

  const handleEmpForm = () => {
    setIsEmpVisible(!isEmpVisible);
    setIsVisible(false); // Hide update employee form when showing add form
  };

  // Employee Adding Form
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmpInput = (e) => {
    const { name, value } = e.target;
    setEmpForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Updating Employee Details
  const updateDetail = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:8080/api/employees/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        showToast("Employee Updated Successfully");
        setIsVisible(false);
        setFormData({ id: "", name: "", role: "", salary: "" });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Deleting Employee
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/${delId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        showToast("Employee Deleted Successfully");
        setDelId(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Adding Employee
  const addEmp = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(empForm),
      });
      if (response.ok) {
        showToast("Employee Added Successfully");
        setIsEmpVisible(false);
        setEmpForm({ name: "", role: "", salary: "" });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="heading">
        <h1>EMPLOYEE MANAGEMENT SYSTEM</h1>
      </div>
      <div className="navbar">
        <ul className="buttons">
          <li className="add-emp">
            <button onClick={handleEmpForm}>Add Employee</button>
          </li>
          <li className="get-emp">
            <button onClick={getAllEmp}>Get All Employees</button>
          </li>
          <li className="get-emp-id">
            <button onClick={empById}>Get Employee By ID</button>
            <input
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </li>
          <li className="up-emp">
            <button onClick={handleForm}>Update Employee Detail</button>
          </li>
          <li className="del-emp">
            <button onClick={handleDelete}>Delete Employee</button>
            <input
              type="number"
              value={delId}
              onChange={(e) => setDelId(e.target.value)}
            />
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="table-container">
          {emp.length > 0 && (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {emp.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <td>{employee.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="table-container">
          {employee && (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.salary}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div>
        {/* Modal for Update Employee */}
        {isVisible && (
          <div>
            <div className="modal-overlay" onClick={() => setIsVisible(false)} />
            <div className="modal">
              <button
                className="close-button"
                onClick={() => setIsVisible(false)}
              >
                &times;
              </button>
              <form>
                <div className="form-group">
                  <label>Id:</label>
                  <input
                    type="number"
                    value={formData.id}
                    name="id"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    name="name"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label>Role:</label>
                  <input
                    type="text"
                    value={formData.role}
                    name="role"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label>Salary:</label>
                  <input
                    type="text"
                    value={formData.salary}
                    name="salary"
                    onChange={handleInput}
                  />
                </div>
              </form>
              <button className="formButton" onClick={updateDetail}>Submit</button>
            </div>
          </div>
        )}

        {/* Modal for Add Employee */}
        {isEmpVisible && (
          <div>
            <div
              className="modal-overlay"
              onClick={() => setIsEmpVisible(false)}
            />
            <div className="modal">
              <button
                className="close-button"
                onClick={() => setIsEmpVisible(false)}
              >
                &times;
              </button>
              <form>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={empForm.name}
                    name="name"
                    onChange={handleEmpInput}
                  />
                </div>
                <div className="form-group">
                  <label>Role:</label>
                  <input
                    type="text"
                    value={empForm.role}
                    name="role"
                    onChange={handleEmpInput}
                  />
                </div>
                <div className="form-group">
                  <label>Salary:</label>
                  <input
                    type="text"
                    value={empForm.salary}
                    name="salary"
                    onChange={handleEmpInput}
                  />
                </div>
              </form>
              <button className="formButton" onClick={addEmp}>Submit</button>
            </div>
          </div>
        )}
      </div>
      {toastVisible && (
        <div className={`toast ${toastVisible ? "show" : ""}`}>
          {toastMessage}
        </div>
      )}

      
    </div>
  );
}

export default App;

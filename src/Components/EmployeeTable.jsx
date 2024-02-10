import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');


  //  useEffect(() => {
        const fetchEmployees = async () => {
            try {
                debugger
                const response = await axios.get('https://localhost:7277/api/Employee/GetAllEmployees');
                debugger
                setEmployees(response.data.listEmployee); // Set the retrieved data in the state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

       // fetchEmployees();
    //}, []);


    const addEmployee = async () => {
        const employeeData = {
            id: 0,
            name: "Kanifnath Ghanwat",
            email: "kanifnath@gmail.com",
            isActive: 1
        };

        try {
            await axios.post('https://localhost:7277/api/Employee/AddEmployee', employeeData);
            setSuccessMessage('Employee added successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); // Clear the message after 3 seconds (3000 milliseconds)
        } catch (error) {
            console.error('Error adding employee:', error);
            // Handle error if needed
        }
    };


    return (
        <div>
            {/*<h2>Employee Table</h2>*/}
            <div className="table-container">
                <h2>Employee Table</h2>

                <button className="custom-button" onClick={() => fetchEmployees()}>Get Data </button>
            <button className="custom-button" onClick={() => addEmployee()}> Add Employee </button>

            <div>
                
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
            </div>
                
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.isActive ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

        </div>
    );
};

export default EmployeeTable;

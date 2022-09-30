import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../components/csv.css";

const CsvToTable = () => {
  const [csvFile, setCsvFile] = useState();
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(true);
  const [customer, setCustomer] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [customerErrorRecord, setCustomerErrorRecord] = useState([]);
  const [customerErrorID, setCustomerErrorID] = useState("");

  const history = useHistory();

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    try {
      const customer = await fetch(
        `${process.env.URL}/upload-files/getCustomers`,
        {
          method: "GET",
        }
      );
      const CustomerData = await customer.json();
      setCustomer(CustomerData);
      getCustomerErrorData();
    } catch (error) {
      return error;
    }
  };

  const getCustomerErrorData = async () => {
    try {
      const customer = await fetch(
        `${process.env.URL}/upload-files/getCustomerErrors`,
        {
          method: "GET",
        }
      );
      const CustomerData = await customer.json();
      setCustomerErrorRecord(CustomerData);
    } catch (error) {
      return error;
    }
  };

  const validateCustomerData = async (csv) => {
    const formData = new FormData();
    formData.append("csv", csv);
    const validatedValues = fetch(
      `${process.env.URL}/upload-files/validateCsv`,
      {
        method: "POST",
        body: formData,
      }
    );
    // const errorValues = await (await validatedValues).json();
    // console.log(errorValues);
    // const validationErrorValues = [];
    // for (let i = 0; i < errorValues.length; i++) {
    //   validationErrorValues.push(errorValues[i].message);
    // }
    // setErrorMessage(validationErrorValues);
  };

  const editChanges = (e) => {
    e.preventDefault();
    history.push("/EditCustomers");
  };

  const handleInputFile = (e) => {
    setCsvFile(e.target.files[0]);
    console.log(e.target.files[0]);
    const fileName = e.target.files[0].name;
    const fileExt = fileName.split(".")[1];
    if (!["csv"].includes(fileExt)) {
      setMessage("Please Enter a Valid CSV file");
      setInvalid(true);
    } else {
      setInvalid(false);
    }
    const errorMessages = validateCustomerData(e.target.files[0]);
    console.log(errorMessages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Customer Details");
    getCustomerData();
  };

  return (
    <>
      <form>
        <br />
        <input type="file" onChange={handleInputFile} />
        <br />
        <button className="button" disabled={invalid} onClick={handleSubmit}>
          Import
        </button>
        <button className="button" onClick={editChanges}>
          Edit Changes
        </button>
      </form>
      <h4 className="h3">{message}</h4>
      <h1 className="h3">Customer Error Records</h1>
      <table id="customer-errors">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customerErrorRecord.length ? (
            customerErrorRecord.map((customerErrorRecord) => (
              <tr key={customerErrorRecord.ID}>
                {customerErrorID !== customerErrorRecord.ID && (
                  <>
                    <td>{customerErrorRecord.ID}</td>
                    <td>{customerErrorRecord.NAME}</td>
                    <td> {customerErrorRecord.EMAIL}</td>
                    <td> {customerErrorRecord.CONTACT}</td>
                    <td> {customerErrorRecord.GENDER}</td>
                    <td> {customerErrorRecord.ADDRESS}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td>No customer error records found</td>
            </tr>
          )}
        </tbody>
      </table>
      <hr />
      <h1 className="h4">Customer Details</h1>
      <table id="customers">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customer.length ? (
            customer.map((customer) => (
              <tr key={customer.ID}>
                {customerID !== customer.ID && (
                  <>
                    <td>{customer.ID}</td>
                    <td>{customer.NAME}</td>
                    <td> {customer.EMAIL}</td>
                    <td> {customer.CONTACT}</td>
                    <td> {customer.GENDER}</td>
                    <td> {customer.ADDRESS}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td>No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CsvToTable;

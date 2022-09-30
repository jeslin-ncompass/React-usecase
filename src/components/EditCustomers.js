import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../components/csv.css";

const EditCustomers = () => {
  const [customer, setCustomer] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [customerInput, setCustomerInput] = useState({
    ID: "",
    NAME: "",
    CONTACT: "",
    EMAIL: "",
    GENDER: "",
    ADDRESS: "",
  });

  const history = useHistory();

  useEffect(() => {
    getCustomerData();
  }, []);

  const navigateToHome = () => {
    history.push({ pathname: "/Home" });
  };

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
    } catch (error) {
      return error;
    }
  };

  const editCustomer = () => {
    try {
      fetch(`${process.env.URL}/upload-files/updateCustomer`, {
        method: "PUT",
        body: JSON.stringify(customerInput),
        headers: {
          "Content-type": "application/json",
        },
      });
      getCustomerData();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <br />
      <br />
      <table id="customers">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Edit</th>
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
                    <td>
                      <button
                        className="button"
                        id={customer.ID}
                        onClick={(e) => {
                          setCustomerID(e.target.id);
                          setCustomerInput({ ...customer });
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
                <>
                  {customerID === customer.ID && (
                    <>
                      <td>
                        <input
                          type="text"
                          onChange={(e) =>
                            setCustomerInput({
                              ...customerInput,
                              NAME: e.target.value,
                            })
                          }
                          defaultValue={customer.NAME}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) =>
                            setCustomerInput({
                              ...customerInput,
                              EMAIL: e.target.value,
                            })
                          }
                          defaultValue={customer.EMAIL}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) =>
                            setCustomerInput({
                              ...customerInput,
                              CONTACT: e.target.value,
                            })
                          }
                          defaultValue={customer.CONTACT}
                        />
                      </td>
                      <td>
                        <select
                          name="gender"
                          onChange={(e) =>
                            setCustomerInput({
                              ...customerInput,
                              GENDER: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="O">Others</option>
                          defaultValue={customer.GENDER}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) =>
                            setCustomerInput({
                              ...customerInput,
                              ADDRESS: e.target.value,
                            })
                          }
                          defaultValue={customer.ADDRESS}
                        />
                      </td>
                      <td>
                        <button
                          className="button"
                          onClick={() => {
                            editCustomer();
                            setCustomerID("");
                          }}
                        >
                          Save
                        </button>
                      </td>
                      <td>
                        <button
                          className="button"
                          id={customer.ID}
                          onClick={() => setCustomerID("")}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  )}
                </>
              </tr>
            ))
          ) : (
            <tr>
              <td>No customers found</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="button" onClick={() => navigateToHome()}>
        Save changes
      </button>
    </>
  );
};
export default EditCustomers;

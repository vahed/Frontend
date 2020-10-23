import React, { useState } from "react";
import CustomerApiService from "./ApiService";

const AddCustomer = () => {
    const initialCustomerState = {
        id: null,
        first_name: "",
        family_name: "",
        published: false
    };
    const [customer, setCustomer] = useState(initialCustomerState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const saveCustomer = () => {
        var data = {
            first_name: customer.first_name,
            family_name: customer.family_name
        };

        CustomerApiService.create(data)
            .then(response => {
                setCustomer({
                    id: response.data.id,
                    first_name: response.data.first_name,
                    family_name: response.data.family_name,
                    published: response.data.published
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newCustomer = () => {
        setCustomer(initialCustomerState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newCustomer}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            value={customer.first_name}
                            onChange={handleInputChange}
                            name="first_name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="family_name">Family name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="family_name"
                            value={customer.family_name}
                            onChange={handleInputChange}
                            name="family_name"
                            required
                        />
                    </div>

                    <button onClick={saveCustomer} className="btn btn-success">
                        Add customer
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddCustomer;
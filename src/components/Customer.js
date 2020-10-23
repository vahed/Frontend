import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import CustomerApiService from "./ApiService";

const Customer = props => {
    const initialCustomerState = {
        id: null,
        first_name: "",
        family_name: "",
        description: "",
        cost: "",
        quantity: ""
    };
    const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
    const [message, setMessage] = useState("");
    const location = useLocation();

    const getCustomer = id => {
        CustomerApiService.get(id)
            .then(response => {
                console.log(response.data);
                setCurrentCustomer(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        //console.log((props.id));
        getCustomer(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        setCurrentCustomer({ ...currentCustomer, [event.target.name]: event.target.value });
    };

    const updatePublished = status => {
        var data = {
            id: currentCustomer.id,
            first_name: currentCustomer.first_name,
            family_name: currentCustomer.family_name,
            published: status
        };

        CustomerApiService.update(currentCustomer.id, data)
            .then(response => {
                setCurrentCustomer({ ...currentCustomer, published: status });
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateCustomer = () => {
        CustomerApiService.update(currentCustomer.id, currentCustomer)
            .then(response => {
                console.log(response.data);
                setMessage("The customer was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentCustomer ? (
                <div className="edit-form">
                    <h4>Customer</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">First name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                value={currentCustomer.first_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="family_name">Family name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="family_name"
                                name="family_name"
                                value={currentCustomer.family_name}
                                onChange={handleInputChange}
                            />
                        </div>

                    </form>

                    {(location.pathname).includes("customers") ? (
                        <button
                            type="submit"
                            className="badge badge-success mr-2"
                            onClick={updateCustomer}
                        >
                            Update
                        </button>
                    ) : ( null )
                    }

                    <br /><br />

                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <p>Please click on a Customer...</p>
                </div>
            )}
        </div>
    );
};

export default Customer;
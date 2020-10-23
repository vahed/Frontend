import React, { Fragment, useState, useEffect, useCallback } from "react";
import CustomerApiService from "./ApiService";
import { Link } from "react-router-dom";

const CustomerList = (props) => {
    const [customers, setCustomers] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        retrieveCustomers();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveCustomers = () => {
        CustomerApiService.getAll()
            .then(response => {
                const json = response.data.customers;
                console.log(iterateJson(json));
                setCustomers(iterateJson(json));
            })
            .catch(err => {
                console.log(err);
            });
    };

    const iterateJson = (json) => {
        var arr = [];
        Object.keys(json).forEach(function(key) {
            arr.push(json[key]);
        });
        return arr;
    }

    const refreshList = () => {
        retrieveCustomers();
        setCurrentCustomer(null);
        setCurrentIndex(-1);
    };

    const setActiveCustomer = (customer, index) => {
        setCurrentCustomer(customer);
        setCurrentIndex(index);
    };

    const findByName = () => {
        CustomerApiService.findByName(searchName)
            .then(response => {
                console.log(response.data);
                setCustomers(response.data);
            })
            .catch(e => {
                setMessage("Type name");
                //console.log(e);
            });
    };

    return (
        <Fragment>
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {message ? <div className="alert-danger"><strong>{message}<br/><br/></strong></div> : ' '}
            </div>
                <div className="col-md-6">
                <h4>Customers List</h4>

                <ul className="list-group">
                {customers &&
                customers.map((customer, index) => (
                    <li
                        className={
                            "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveCustomer(customer, index)}
                        key={index}
                    >
                        {customer.first_name} {' '} {customer.family_name}
                    </li>

                ))}
                </ul>

                </div>
                <div className="col-md-6">
                {currentCustomer ? (
                    <div>
                        <h4>Customer</h4>
                        <div>
                            <label>
                                <strong>First name:</strong>
                            </label>
                            {' '}{currentCustomer.first_name}
                        </div>
                        <div>
                            <label>
                                <strong>Family name:</strong>
                            </label>
                            {' '}{currentCustomer.family_name}
                        </div>

                        <Link
                            to={"/customers/" + currentCustomer.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Customer...</p>
                    </div>
                )
                }
                </div>
        </Fragment>
    );
}

export default CustomerList;

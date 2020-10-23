import React, { Fragment, useState, useEffect } from "react";
import CustomerApiService from "./ApiService";
import { Link } from "react-router-dom";
import "./css/orderList.css";

const OrderList = (props) => {
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        retrieveOrders();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveOrders = () => {
        CustomerApiService.getAllOrders()
            .then(response => {
                const json = response.data.orders;
                console.log(iterateJson(json));
                setOrders(iterateJson(json));
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
        retrieveOrders();
        setCurrentOrder(null);
        setCurrentIndex(-1);
    };

    const setActiveOrder = (order, index) => {
        setCurrentOrder(order);
        setCurrentIndex(index);
    };

    const findByName = () => {
        CustomerApiService.findByName(searchName)
            .then(response => {
                console.log(response.data);
                setOrders(response.data);
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

                </div>
                {message ? <div className="alert-danger"><strong>{message}<br/><br/></strong></div> : ' '}
            </div>
            <div className="col-md-6">
                <h4>Orders List</h4><br />

                <ul className="list-group">
                    <div className="order_header">
                        <div id="item1">Order No</div>
                        <div id="item2">Date</div>
                        <div id="item3">Csutomer</div>
                        <div id="item4">Total</div>
                    </div>
                    {orders &&
                    orders.map((order, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveOrder(order, index)}
                            key={index}
                        >
                            <div className="order_grid">
                                <div id="item5">{order.order_number}</div>
                                <div id="item6">{order.order_date}</div>
                                <div id="item7">{order.customer}</div>
                                <div id="item8">{order.total}</div>
                            </div>
                        </li>

                    ))}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-secondary float-right"
                >
                    <span className="add_order_link">
                        <Link to={"/add"} >
                            Add new customer
                        </Link>
                    </span>
                </button><br/><br/><br/>
            </div>


            <div className="col-md-6">
                {currentOrder ? (
                    <div>
                        <h4>Order</h4>
                        <div>
                            <label>
                                <strong>Order no:</strong>
                            </label>
                            {' '}{currentOrder.order_number}
                        </div>
                        <div>
                            <label>
                                <strong>Date:{" "}</strong>
                            </label>
                            {' '}{currentOrder.order_date}
                        </div>

                        <Link
                            to={"/customers/" + currentOrder.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p className="alert-primary">Please click on a Order...</p>
                    </div>
                )
                }
            </div>
        </Fragment>
    );
}

export default OrderList;

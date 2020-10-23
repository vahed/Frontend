import React from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';

import UploadOrder from "./components/UploadOrder";
import AddCustomer from "./components/AddCustomer";
import Customer from "./components/Customer";
import CustomerList from "./components/CustomerList";
import OrderList from "./components/OrderList";
import ProductList from "./components/ProductList";

function App() {
    return (
        <div>
            <BrowserRouter>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/customers" className="navbar-brand">
                    All customers
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/customers"} className="nav-link">
                            Customers
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/orders"} className="nav-link">
                            Orders
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/uploadOrder"} className="nav-link">
                            Upload orders
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/products"} className="nav-link">
                            Products
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/customers"]} component={CustomerList} />
                    <Route exact path="/add" component={AddCustomer} />
                    <Route exact path="/customers/:id" component={Customer} />
                    <Route exact path="/orders" component={OrderList} />
                    <Route exact path="/uploadOrder" component={UploadOrder} />
                    <Route exact path="/products" component={ProductList} />
                </Switch>
            </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

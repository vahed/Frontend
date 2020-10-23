import React from 'react';
import ReactDOM from 'react-dom';
import CustomerList from './CustomerList';

const Home = () => {
    return (
        <div className="container">
            <h1>Customers:</h1>
            <CustomerList />
        </div>
    );
}

export default Home;

/*if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}*/

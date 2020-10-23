import React, {useState,useEffect} from 'react';
import CustomerApiService from "./ApiService";
import "./css/productList.css";

const ProductList = (props) => {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState("Products");
    const [num, setNum] = useState(0);

    useEffect(() => {
        let unmounted = false;
        async function getCharacters() {
            const response = await fetch(
                "http://127.0.0.1:8000/api/products"
            );

            const body = await response.json();
            console.log(body);
            if (!unmounted) {
                setItems(
                    body.map(({ description, id, cost }) => ({ label: description, value: id, cost:cost }))
                );
                setLoading(false);
            }

        }
        getCharacters();
        return () => {
            unmounted = true;
        };
    }, []);

    return (
        <div className="product_header">
            <div className="prod"><strong>Products / price</strong></div>
            <div className="cat"><strong>Quantity</strong></div>
            <div id="item3">
                <select
                    disabled={loading}
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                >
                    {items.map(({ label, value, cost }) => (
                        <option key={value} value={value} >
                            {label}{' : '}{cost}
                        </option>

                    ))}

                </select>
            </div>
            <div id="item4">
                <input
                    className="input-counter"
                    type="number"
                    min={0}
                    max={100000}
                    step={1}
                    value={num}
                    onChange={e => setNum(e.target.value)}
                />
            </div>
        </div>
    );
}

export default ProductList;
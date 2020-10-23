import http from "../api-common";

const getAll = () => {
    return http.get("/customers");
};

const get = id => {
    return http.get(`/customers/${id}`);
};

const create = data => {
    return http.post("/customers", data);
};

const update = (id, data) => {
    return http.put(`/customers/${id}`, data);
};

const findByName = first_name => {
    return http.get(`/customers/first_name/${first_name}`);
};

const uploadOrder = () => {
    return http.post(`http://127.0.0.1:8000/api/uploadcsv`);
};

const getAllOrders = () => {
    return http.get(`http://127.0.0.1:8000/api/getAllOrders`);
}

const getProducts= () => {
    return http.get(`http://127.0.0.1:8000/api/products`);
}

export default {
    getAll,
    get,
    create,
    update,
    findByName,
    uploadOrder,
    getAllOrders,
    getProducts
};

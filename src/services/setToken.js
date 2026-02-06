import axios from "axios";
export var setToken = function (token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer ".concat(token);
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

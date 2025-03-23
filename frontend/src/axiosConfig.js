import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia esto si tu backend usa otra URL base
});

export default instance;
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia esto si tu backend usa otra URL base
});

// Interceptor para añadir el token JWT a las solicitudes
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Añadir el token al encabezado Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Rechazar la promesa si hay un error en la configuración
  }
);

// Interceptor para manejar errores globalmente
instance.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente devuélvela
  (error) => {
    if (error.response) {
      // Errores del servidor (códigos 4xx o 5xx)
      console.error("Error en la respuesta:", error.response.data.message || error.message);
    } else if (error.request) {
      // No se recibió respuesta del servidor
      console.error("No se recibió respuesta del servidor:", error.message);
    } else {
      // Error al configurar la solicitud
      console.error("Error en la solicitud:", error.message);
    }
    return Promise.reject(error); // Rechazar la promesa para manejar el error en el componente
  }
);

export default instance;
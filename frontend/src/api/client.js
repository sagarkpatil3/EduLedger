// src/api/client.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // <-- your backend server
  headers: {
    "Content-Type": "application/json",
  },
});

// OPTIONAL: If you later want token auth
// API.interceptors.request.use((req) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user?.token) {
//     req.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return req;
// });

export default API;

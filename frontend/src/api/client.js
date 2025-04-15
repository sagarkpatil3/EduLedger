import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // 🔁 change this if your backend runs elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add auth token support later
// API.interceptors.request.use((req) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user?.token) {
//     req.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return req;
// });

export default API;

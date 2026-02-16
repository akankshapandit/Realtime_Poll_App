import axios from "axios";

const api = axios.create({
  baseURL: "https://realtime-poll-app-1-fah5.onrender.com/api",
});

export default api;

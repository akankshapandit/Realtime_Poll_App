import axios from "axios";

const api = axios.create({
  baseURL: "https://realtime-poll-app-qm5w.onrender.com/api",
});

export default api;

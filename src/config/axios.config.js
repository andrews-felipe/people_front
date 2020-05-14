import Axios from "axios";

export const http = new Axios.create({
  baseURL: "http://localhost:5000/api/",
});

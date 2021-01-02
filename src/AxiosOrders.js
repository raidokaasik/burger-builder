import axios from "axios";

const instance = axios.create({
  baseURL: "https://builder-app-9a83c.firebaseio.com/",
});

export default instance;

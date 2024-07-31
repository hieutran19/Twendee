import axios from "axios";
const Http = axios.create({
    baseURL: `https://randomuser.me/api`,
});
export default Http;
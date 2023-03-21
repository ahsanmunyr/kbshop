import axios from "axios";
import config from "./config"
const Konnect=axios.create({
    baseURL:config.base_url
})

export default Konnect

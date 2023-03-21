import axios from "axios"
import Konnect from "../../config/konnect"
export const kbslyShortURL = (url) => async (dispatch) => {
    try {
        
        const res = await axios.post('https://kbsly.com/v1/shorturl',{
            url: url
        })
        console.log(res.data)
        return res.data

    } catch (error) {
        console.log(error, "error")
    }
}

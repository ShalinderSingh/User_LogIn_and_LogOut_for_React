import axios from "axios"
import { API_FETCH } from "./actionType"


export const apiFetch = () => async (dispatch) => {
    const res = await axios('https://jsonplaceholder.typicode.com/photos')

    dispatch({
        type: API_FETCH,
        payload: res.data
    })

}

export default API_FETCH
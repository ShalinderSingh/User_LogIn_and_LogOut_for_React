import { API_FETCH } from "./actionType"

// const initialState = {
//     photo: [],
// }
export const Reducer = (state = [], { type, payload }) => {
    switch (type) {
        case API_FETCH:
            return { ...state, photo: payload }

        default:
            return state
    }

}
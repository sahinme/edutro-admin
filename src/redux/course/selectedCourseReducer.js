import {
    GET_SELECTED_COURSE_REQUEST,
    GET_SELECTED_COURSE_FAILURE,
    GET_SELECTED_COURSE_SUCCESS
} from "redux/course/actions";

const initialState = {
    data: null,
    error: null,
    message: null
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_SELECTED_COURSE_REQUEST:
            return { ...state, success: null, data: null, message: null };
        case GET_SELECTED_COURSE_SUCCESS:
            return { ...state, success: true, data: payload };
        case GET_SELECTED_COURSE_FAILURE:
            return { ...state, success: false, message: payload.message };
        default:
            return state;
    }
}
import { GET_SELECTED_QUESTION_FAILURE, GET_SELECTED_QUESTION_REQUEST, GET_SELECTED_QUESTION_SUCCESS } from './actions';

const initialState = {
    data: null,
    error: null,
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_SELECTED_QUESTION_REQUEST:
            return { ...state, error: '' };
        case GET_SELECTED_QUESTION_SUCCESS:
            return { ...state, data: payload };
        case GET_SELECTED_QUESTION_FAILURE:
            return { ...state, error: payload };
        default:
            return state;
    }
}

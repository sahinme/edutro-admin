import { GET_LOCATIONS_FAILURE, GET_LOCATIONS_REQUEST, GET_LOCATIONS_SUCCESS } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_LOCATIONS_REQUEST:
      return { ...state, error: '' };
    case GET_LOCATIONS_SUCCESS:
      return { ...state, data: payload };
    case GET_LOCATIONS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}

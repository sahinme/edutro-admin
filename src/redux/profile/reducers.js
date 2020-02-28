import { GET_PROFILE_INFO_FAILURE, GET_PROFILE_INFO_REQUEST, GET_PROFILE_INFO_SUCCESS } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_PROFILE_INFO_REQUEST:
      return { ...state, error: '' };
    case GET_PROFILE_INFO_SUCCESS:
      return { ...state, data: payload };
    case GET_PROFILE_INFO_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}

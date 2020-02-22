import { GET_TENANT_COURSES_REQUEST, GET_TENANT_COURSES_SUCCESS, GET_TENANT_COURSES_FAILURE } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_TENANT_COURSES_REQUEST:
      return { ...state, error: '' };
    case GET_TENANT_COURSES_SUCCESS:
      return { ...state, data: payload };
    case GET_TENANT_COURSES_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}

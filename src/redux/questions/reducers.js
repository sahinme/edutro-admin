import { GET_TENANT_QUESTIONS_REQUEST, GET_TENANT_QUESTIONS_SUCCESS, GET_TENANT_QUESTIONS_FAILURE } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_TENANT_QUESTIONS_REQUEST:
      return { ...state, error: '' };
    case GET_TENANT_QUESTIONS_SUCCESS:
      return { ...state, data: payload };
    case GET_TENANT_QUESTIONS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}

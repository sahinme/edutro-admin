import { GET_TENANT_EDUCATORS_REQUEST, GET_TENANT_EDUCATORS_SUCCESS, GET_TENANT_EDUCATORS_FAILURE } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_TENANT_EDUCATORS_REQUEST:
      return { ...state, error: '' };
    case GET_TENANT_EDUCATORS_SUCCESS:
      return { ...state, data: payload };
    case GET_TENANT_EDUCATORS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}

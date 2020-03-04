import { GET_TENANT_BLOG_REQUEST, GET_TENANT_BLOG_FAILURE, GET_TENANT_BLOG_SUCCESS } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_TENANT_BLOG_REQUEST:
      return { ...state, error: '' };
    case GET_TENANT_BLOG_SUCCESS:
      return { ...state, data: payload };
    case GET_TENANT_BLOG_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}

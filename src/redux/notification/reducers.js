import { GET_ENTITY_NOTIFICATIONS_FAILURE, GET_ENTITY_NOTIFICATIONS_REQUEST, GET_ENTITY_NOTIFICATIONS_SUCCESS } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ENTITY_NOTIFICATIONS_REQUEST:
      return { ...state, error: '' };
    case GET_ENTITY_NOTIFICATIONS_SUCCESS:
      return { ...state, data: payload };
    case GET_ENTITY_NOTIFICATIONS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}

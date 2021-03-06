import { GET_ENTITY_QUESTIONS_FAILURE, GET_ENTITY_QUESTIONS_REQUEST, GET_ENTITY_QUESTIONS_SUCCESS } from './actions';

const initialState = {
  data: null,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ENTITY_QUESTIONS_REQUEST:
      return { ...state, error: '' };
    case GET_ENTITY_QUESTIONS_SUCCESS:
      return { ...state, data: payload };
    case GET_ENTITY_QUESTIONS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
}

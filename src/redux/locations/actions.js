export const GET_LOCATIONS_REQUEST = 'GET_LOCATIONS_REQUEST';
export const GET_LOCATIONS_SUCCESS = 'GET_LOCATIONS_SUCCESS';
export const GET_LOCATIONS_FAILURE = 'GET_LOCATIONS_FAILURE';

export const getLocationsRequest = payload => ({
  type: GET_LOCATIONS_REQUEST,
  payload,
});


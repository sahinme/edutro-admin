export const GET_PROFILE_INFO_REQUEST = 'GET_PROFILE_INFO_REQUEST';
export const GET_PROFILE_INFO_SUCCESS = 'GET_PROFILE_INFO_SUCCESS';
export const GET_PROFILE_INFO_FAILURE = 'GET_PROFILE_INFO_FAILURE';

export const getProfileInfoRequest = payload => ({
  type: GET_PROFILE_INFO_REQUEST,
  payload,
});


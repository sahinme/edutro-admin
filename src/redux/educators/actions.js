export const GET_TENANT_EDUCATORS_REQUEST = 'GET_TENANT_EDUCATORS_REQUEST';
export const GET_TENANT_EDUCATORS_SUCCESS = 'GET_TENANT_EDUCATORS_SUCCESS';
export const GET_TENANT_EDUCATORS_FAILURE = 'GET_TENANT_EDUCATORS_FAILURE';

export const getTenantEducatorsRequest = payload => ({
  type: GET_TENANT_EDUCATORS_REQUEST,
  payload,
});

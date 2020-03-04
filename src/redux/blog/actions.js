export const GET_TENANT_BLOG_REQUEST = 'GET_TENANT_BLOG_REQUEST';
export const GET_TENANT_BLOG_SUCCESS = 'GET_TENANT_BLOG_SUCCESS';
export const GET_TENANT_BLOG_FAILURE = 'GET_TENANT_BLOG_FAILURE';

export const CREATE_BLOG_POST_REQUEST = 'CREATE_BLOG_POST_REQUEST';
export const CREATE_BLOG_POST_SUCCESS = 'CREATE_BLOG_POST_SUCCESS';
export const CREATE_BLOG_POST_FAILURE = 'CREATE_BLOG_POST_FAILURE';

export const getTenantBlogRequest = payload => ({
  type: GET_TENANT_BLOG_REQUEST,
  payload,
});

export const createPostRequest = payload => ({
  type: CREATE_BLOG_POST_REQUEST,
  payload,
});


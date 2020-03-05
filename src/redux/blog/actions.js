export const GET_BLOG_POSTS_REQUEST = 'GET_BLOG_POSTS_REQUEST';
export const GET_BLOG_POSTS_SUCCESS = 'GET_BLOG_POSTS_SUCCESS';
export const GET_BLOG_POSTS_FAILURE = 'GET_BLOG_POSTS_FAILURE';

export const GET_SELECTED_POST_REQUEST = 'GET_SELECTED_POST_REQUEST';
export const GET_SELECTED_POST_SUCCESS = 'GET_SELECTED_POST_SUCCESS';
export const GET_SELECTED_POST_FAILURE = 'GET_SELECTED_POST_FAILURE';

export const CREATE_BLOG_POST_REQUEST = 'CREATE_BLOG_POST_REQUEST';
export const CREATE_BLOG_POST_SUCCESS = 'CREATE_BLOG_POST_SUCCESS';
export const CREATE_BLOG_POST_FAILURE = 'CREATE_BLOG_POST_FAILURE';

export const EDIT_BLOG_POST_REQUEST = 'EDIT_BLOG_POST_REQUEST';
export const EDIT_BLOG_POST_SUCCESS = 'EDIT_BLOG_POST_SUCCESS';
export const EDIT_BLOG_POST_FAILURE = 'EDIT_BLOG_POST_FAILURE';

export const getEntityBlogPostRequest = payload => ({
  type: GET_BLOG_POSTS_REQUEST,
  payload,
});

export const getSelectedBlogPostRequest = payload => ({
  type: GET_SELECTED_POST_REQUEST,
  payload,
});

export const createPostRequest = payload => ({
  type: CREATE_BLOG_POST_REQUEST,
  payload,
});

export const editPostRequest = payload => ({
  type: EDIT_BLOG_POST_REQUEST,
  payload,
});


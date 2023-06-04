// Action Types
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_NESTED_COMMENT = 'ADD_NESTED_COMMENT';
export const DELETE_NESTED_COMMENT = 'DELETE_NESTED_COMMENT';

// Action Creators
export const addPost = (title, content) => ({
  type: ADD_POST,
  payload: {
    id: new Date().getTime().toString(),
    title,
    content,
    comments: [],
  },
});

export const editPost = (postId, title, content) => ({
  type: EDIT_POST,
  payload: {
    postId,
    title,
    content,
  },
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: {
    postId,
  },
});

export const addComment = (postId, commentText) => ({
  type: ADD_COMMENT,
  payload: {
    postId,
    commentId: new Date().getTime().toString(),
    commentText,
  },
});

export const deleteComment = (postId, commentId) => ({
  type: DELETE_COMMENT,
  payload: {
    postId,
    commentId,
  },
});

export const addNestedComment = (postId, commentId, nestedCommentText) => ({
  type: ADD_NESTED_COMMENT,
  payload: {
    postId,
    commentId,
    nestedCommentId: new Date().getTime().toString(),
    nestedCommentText,
  },
});

export const deleteNestedComment = (postId, commentId, nestedCommentId) => ({
  type: DELETE_NESTED_COMMENT,
  payload: {
    postId,
    commentId,
    nestedCommentId,
  },
});

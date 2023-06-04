export const ADD_NESTED_COMMENT = 'ADD_NESTED_COMMENT';
export const DELETE_NESTED_COMMENT = 'DELETE_NESTED_COMMENT';

const initialState = {
    posts: [],
    comments:{}
  };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "EDIT_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                title: action.payload.title,
                content: action.payload.content,
              }
            : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload.postId),
      };
    case "ADD_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: action.payload.commentId,
                    text: action.payload.commentText,
                    nestedComments: [],
                  },
                ],
              }
            : post
        ),
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment.id !== action.payload.commentId
                ),
              }
            : post
        ),
      };
    case "ADD_NESTED_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === action.payload.commentId
                    ? {
                        ...comment,
                        nestedComments: [
                          ...comment.nestedComments,
                          {
                            id: action.payload.nestedCommentId,
                            text: action.payload.nestedCommentText,
                            nestedComments: [],
                          },
                        ],
                      }
                    : comment
                ),
              }
            : post
        ),
      };
    case "EDIT_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === action.payload.commentId
                    ? {
                        ...comment,
                        nestedComments: comment.nestedComments.filter(
                          (nestedComment) =>
                            nestedComment.id !== action.payload.nestedCommentId
                        ),
                      }
                    : comment
                ),
              }
            : post
        ),
      };
      case "DELETE_NESTED_COMMENT":
        return {
          ...state,
          posts: state.posts.map((post) =>
            post.id === action.payload.postId
              ? {
                  ...post,
                  comments: post.comments.map((comment) =>
                    comment.id === action.payload.commentId
                      ? {
                          ...comment,
                          nestedComments: comment.nestedComments.filter(
                            (nestedComment) =>
                              nestedComment.id !== action.payload.nestedCommentId
                          ),
                        }
                      : comment
                  ),
                }
              : post
          ),
        };
    default:
      return state;
  }
};

export default rootReducer;

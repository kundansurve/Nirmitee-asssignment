export const ADD_NESTED_COMMENT = 'ADD_NESTED_COMMENT';
export const DELETE_NESTED_COMMENT = 'DELETE_NESTED_COMMENT';

const initialState = {
    posts: [],
    comments:[],
    commentsData:[],
    commentID:0
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
      const commentId=state.commentID+1;
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: state.commentID+1,
                    text: action.payload.commentText,
                    nestedComments: [],
                  },
                ],
              }
            : post
        ),
        comments:[...state.comments,state.commentID+1],
        commentsData:{
          ...state.commentsData,
          [commentId]:{
            id: state.commentID+1,
            text: action.payload.commentText,
            nestedComments: [],
          }
        },
        commentID:state.commentID+1,
      };
    case "DELETE_COMMENT":
      alert(JSON.stringify(action.payload))
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
        comments:state.comments.filter((commentId)=>commentId!= action.payload.commentId
        ),
      };
    case "ADD_NESTED_COMMENT":
      const parentComment=state.commentsData[action.payload.commentId];
      const parrentCommentId =state.commentsData[action.payload.commentId].id;
      console.log("payload"+JSON.stringify(action.payload))
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
                            id: state.commentID+1,
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
        comments:[...state.comments,state.commentID+1],
        commentsData:{
          ...state.commentsData,
          [parrentCommentId]:{
            ...parentComment,
            nestedComments:[...parentComment.nestedComments,{
              id: state.commentID+1,
              text: parentComment.text,
              nestedComments: [],
            }]
          },
          [state.commentID+1]:{
            id: state.commentID+1,
            text: action.payload.nestedCommentText,
            nestedComments: [],
          }
        },commentID:state.commentID+1
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
        comments:state.comments.filter((commentId)=>commentId=== action.payload.commentId
        )
      };
    case "EDIT_COMMENT":
      const prevComment = state.commentsData[action.payload.commentId]
      alert(prevComment)
      return {
        ...state,
        commentsData:{
          [action.payload.commentId]:{
        id:action.payload.commentId,
        text: action.payload.comment,
        nestedComment:prevComment.nestedComment
          }}
      }
    default:
      return state;
  }
};

export default rootReducer;

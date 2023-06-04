import Comment from "./comments";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import EditPost from "./editPost";

const Post = ({
    commentsData,
    comments,
  post,
  deletePost,
  addComment,
  addNestedComment,
  deleteComment,
  deleteNestedComment,
  editPost,
  editComment
}) => {
  const [commentText, setCommentText] = useState("");

  const handleDeletePost = () => {
    deletePost(post.id);
  };

  const handleAddComment = () => {
    addComment(post.id, commentText);
    setCommentText("");
  };

  return (
    <Card key={post.id} className="mb-3">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        <Button variant="danger" onClick={handleDeletePost} style={{backgroundCOlor:"none", border:"none",margin:"1em"}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
          Delete
        </Button>
        <EditPost
          editPost={editPost}
          postId={post.id}
          title={post.title}
          content={post.content}
        />

        <h4>Comments</h4>
        {post.comments.map((comment) => (
          (comments.includes(comment.id))?
          <Comment
            key={comment.id}
            comments={comments}
            commentsData={commentsData}
            comment={commentsData[comment.id]}
            postId={post.id}
            addNestedComment={addNestedComment}
            deleteNestedComment={deleteNestedComment}
            deleteComment={deleteComment}
            editComment={editComment}
          />:null
        ))}

        <Form className="mt-3">
          <Form.Group controlId={`comment-${post.id}`}>
            <Form.Control
              type="text"
              placeholder="Comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </Form.Group>
          <Button type="button" variant="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Post;

import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import EditComment from "./editComment";

const Comment = ({
    comments,
    commentsData,
    comment,
    postId,
    deleteComment,
    addNestedComment,
    deleteNestedComment,
    editComment
  }) => {
    const [nestedCommentText, setNestedCommentText] = useState('');
  
    const handleAddNestedComment = () => {
      addNestedComment(postId, comment.id, nestedCommentText);
      setNestedCommentText('');
    };
  
    const handleDeleteNestedComment = (nestedCommentId) => {
      deleteNestedComment(postId, comment.id, nestedCommentId);
    };
  
    return (
      <Card key={comment.id} className="mb-2 ml-3">
        <Card.Body>
          <Card.Text>{comment.text}</Card.Text>
          <Button
            variant="danger"
            onClick={() => deleteComment(postId,comment.id)}
            type="button"
          >
            Delete Comment
          </Button>
          <EditComment editComment={editComment} commentId={comment.id} commentText={comment.text}/>
          
          <Form className="mt-3">
            <Form.Group controlId={`nested-comment-${comment.id}`}>
              <Form.Control
                type="text"
                placeholder="Nested Comment"
                value={nestedCommentText}
                onChange={(e) => setNestedCommentText(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleAddNestedComment}
              type="button"
            >
              Add Nested Comment
            </Button>
          </Form>
          {console.log(commentsData)}
          {comment.nestedComments.map((nestedComment) => (
            (comments.includes(nestedComment.id))?
            <Comment
              key={nestedComment.id}
              comment={commentsData[nestedComment.id]}
              postId={postId}
              addNestedComment={addNestedComment}
              deleteComment={deleteComment}
              deleteNestedComment={deleteNestedComment}
              editComment={editComment}
            />:null
          ))}
        </Card.Body>
      </Card>
    );
  };
  
export default Comment
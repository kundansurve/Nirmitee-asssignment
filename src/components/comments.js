import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";

const Comment = ({
    comment,
    postId,
    addNestedComment,
    deleteNestedComment,
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
            onClick={() => handleDeleteNestedComment(comment.id)}
          >
            Delete Comment
          </Button>
          
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
            >
              Add Nested Comment
            </Button>
          </Form>
          {comment.nestedComments.map((nestedComment) => (
            <Comment
              key={nestedComment.id}
              comment={nestedComment}
              postId={postId}
              addNestedComment={addNestedComment}
              deleteNestedComment={deleteNestedComment}
            />
          ))}
        </Card.Body>
      </Card>
    );
  };
  
export default Comment
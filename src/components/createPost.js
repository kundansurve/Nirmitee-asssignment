import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import { Form } from "react-bootstrap";

function CreatePost({ addPost, editPost, deletePost }) {
  const [show, setShow] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [error, setError] = useState(null)

  const handleAddPost = () => {
    if(!postTitle || !postContent){
        setError("Post title and content cannot be blank")
        return;
    }
    setError(null)
    addPost(postTitle, postContent);
    setPostTitle("");
    setPostContent("");
    
    handleClose();
  };

  const handleClose = () => {
    setError(null)
    setShow(false);
}
  const handleShow = () => setShow(true);

  return (
    <>
      <div type='button' onClick={handleShow} style={{margin
    :"auto", padding:"2em 40%"}}>
        <span style={{marging:"1em"}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        </span>
        <span style={{margin:"1em"}}>Create Post</span>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Create Post</h1>
          <Form>
            <Form.Group controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter post title"
                value={postTitle}
                maxLength={20}
                onChange={(e) => {setPostTitle(e.target.value);setError(null)}}
              />
            </Form.Group>
            <Form.Group controlId="postContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter post content"
                value={postContent}
                maxLength={250}
                onChange={(e) => {setPostContent(e.target.value);setError(null)}}
              />
            </Form.Group>
          </Form>
          {(error)?<Alert key={"danger"} variant="danger">
          {error}
        </Alert>:null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddPost
            }
          >
            Add Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePost;

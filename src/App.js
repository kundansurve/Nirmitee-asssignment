import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addPost,
  editPost,
  deletePost,
  addComment,
  deleteComment,
  addNestedComment,
  deleteNestedComment,
} from "./actions";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import Post from "./components/Posts";
import Nav from "react-bootstrap/Nav";
import CreatePost from "./components/createPost";

const App = ({
  posts,
  addPost,
  editPost,
  deletePost,
  addComment,
  deleteComment,
  addNestedComment,
  deleteNestedComment,
}) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");


  const handleEditPost = (postId, newTitle, newContent) => {
    editPost(postId, newTitle, newContent);
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  return (
    <>
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        style={{ backgroundColor: "grey", color:"white", padding:"1em"}}
      >
        <Nav.Item>
          Nirmitee.io Assignment
        </Nav.Item>
        
      </Nav>
      <Container>
        <CreatePost addPost={addPost} editPost={editPost} deletePost={deletePost}/>
        <h1>Posts</h1>
        <Row>
          {posts.map((post) => (
            <Col md={6} key={post.id}>
              <Post
                post={post}
                deletePost={handleDeletePost}
                addComment={addComment}
                deleteComment={deleteComment}
                addNestedComment={addNestedComment}
                deleteNestedComment={deleteNestedComment}
                editPost={handleEditPost}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = {
  addPost,
  editPost,
  deletePost,
  addComment,
  deleteComment,
  addNestedComment,
  deleteNestedComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

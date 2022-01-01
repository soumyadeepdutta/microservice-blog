import React, { useState, useEffect } from "react";
// import axios from "axios";

export default ({ comments, postId }) => {
  // set comment.id to comment.commentId - if uncommenting
  // const [comments, setComments] = useState([]);

  // const fetchComments = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const renderedComments = comments.map((comment) => {
    let content;
    comment.status === "approved"
      ? (content = comment.content)
      : comment.status === "rejected"
      ? (content = "Comment is Rejected")
      : (content = "Comment is awaiting moderation");

    return <li key={comment.id}>{content}</li>;
  });

  return <ul key={postId}>{renderedComments}</ul>;
};

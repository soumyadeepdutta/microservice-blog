import React, { useState } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [content, setContent] = useState("");
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "5px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

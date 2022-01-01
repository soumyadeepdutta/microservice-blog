import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    await axios.post("http://localhost:4000/posts", { title });

    setTitle("");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <h1>Create Post</h1>
        <input
          value={title}
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
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
  );
};

import React from "react";
import PostCreation from "./PostCreation";
import PostList from "./PostList";

export default () => {
    return <div className="container">
        <PostCreation />
        <PostList />
    </div>
}
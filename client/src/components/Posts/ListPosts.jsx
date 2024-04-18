import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CreateComment from "../Comments/CreateComment";
import ListComment from "../Comments/ListComponent";

export default function ListComponents() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const res = await axios.get(
      import.meta.env.VITE_POSTS_SERVICE_GET + "posts"
    );
    setPosts(res.data);
  }

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <Card key={post.id}>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.data}</p>
          <ListComment comments={post.comments} />
          <CreateComment postId={post.id} />
        </CardContent>
      </Card>
    );
  });

  return (
    <div>
      <h1>All our posts</h1>
      <div className="flex flex-wrap gap-5 py-4">{renderedPosts}</div>
    </div>
  );
}

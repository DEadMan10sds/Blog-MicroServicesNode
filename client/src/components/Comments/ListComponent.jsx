import { useEffect, useState } from "react";
import axios from "axios";

export default function ListComment({ postId }) {
  const [comments, setComments] = useState([]);

  async function fetchComments() {
    const res = await axios.get(
      import.meta.env.VITE_COMMENTS_SERVICE + `posts/${postId}/comments`
    );
    console.log(res.data);
    setComments(res.data);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = comments.map((comment) => {
    console.log(comment);
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}

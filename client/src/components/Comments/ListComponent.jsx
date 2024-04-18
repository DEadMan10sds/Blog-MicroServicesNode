export default function ListComment({ comments }) {
  const renderedComments = comments.map((comment) => {
    console.log(comment);
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}

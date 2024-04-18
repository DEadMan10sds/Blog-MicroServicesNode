const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Query on events");
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, comment: content, postId } = data;
    const post = post[postId];

    post.comments.push({ id, content });
  }

  console.log(posts);
  return res.send(200);
});

app.listen(4002, () => {
  console.log("Query Listening on port 4002");
});

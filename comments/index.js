const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  return res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { comment: content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  const newComment = { id: commentId, content, status: "pending" };

  comments.push(newComment);

  commentsByPostId[req.params.id] = comments;

  await axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        postId: req.params.id,
        ...newComment,
      },
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });

  return res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const commentToUpdate = commentsByPostId[data.postId].find(
      (comment) => comment.id === data.id
    );

    commentToUpdate.status = data.status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: commentToUpdate,
    });
  }

  return res.status(200).json({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});

const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title, data } = req.body;

  posts[id] = {
    id,
    title,
    data,
  };

  await axios
    .post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });

  return res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event received on Posts", req.body.type);

  return res.status(200).json({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  await axios
    .post("http://localhost:4000/events", event)
    .then((response) => {
      console.log("POSTS", response.status);
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .post("http://localhost:4001/events", event)
    .then((response) => {
      console.log("COMMENTS", response.status);
    })
    .catch((error) => {
      console.log(error);
    });

  await axios
    .post("http://localhost:4002/events", event)
    .then((response) => {
      console.log("QUERY", response.status);
    })
    .catch((error) => {
      console.log(error);
    });

  console.log("Event emmited");
  return res.send({ status: "Ok" });
});

app.listen(4005, () => {
  console.log("Event bus listening on 4005");
});

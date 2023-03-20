const express = require("express");
const user = require("./users/model.js");
//Instance of express app
const server = express();
//teaches express how to parse JSON from the request body
server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello world");
});

server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  }
  try {
    const newUser = req.body;
    const user = await user.insert(newUser);
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await user.find();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const usher = await user.find();
    const id = usher.findById;
    if (!id) {
      return res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

module.exports = server;

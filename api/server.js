const express = require("express");
const user = require("./users/model.js");
//Instance of express app
const server = express();
//teaches express how to parse JSON from the request body
server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello world");
});

// server.post("/api/users/", async (req, res) => {
//   const { name, bio } = req.body;
//   if (!name || !bio) {
//     return res
//       .status(400)
//       .json({ message: "Please provide name and bio for the user" });
//   } else {
//     try {
//       const newlyCreatedUser = await user.create({ name, bio });
//       return res.status(201).json(newlyCreatedUser);
//     } catch (error) {
//       console.error(error.message);
//       return res
//         .status(500)
//         .json({ message: "The users information could not be retrieved" });
//     }
//   }
// });

server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    try {
      const newUser = await user.insert({ name, bio });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    }
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
    const id = req.params.id;
    const User = await user.findById(id);
    if (!User) {
      return res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
    res.json(User);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userToDelete = await user.findById(id);
    if (!userToDelete) {
      return res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
    const deletedUser = await user.remove(id);
    if (!deletedUser) {
      return res.status(500).json({ message: "The user could not be removed" });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error(error.message);
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { bio, name } = req.body;
    const User = await user.findById(id);
    if (!User) {
      return res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }

    if (!bio || !name) {
      return res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    }

    const updatedUser = await user.update(id, { name, bio });

    if (!updatedUser) {
      return res
        .status(500)
        .json({ message: "The user information could not be modified" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = server;

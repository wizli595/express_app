// all imports
import express from "express";
import { data } from "./data.js";

// initial the express app
const app = express();
const PORT = 5000;

const { users } = data;

// @desc All users
// @route GET /
// @access Public
app.get("/", (request, response) => {
  response.json(users);
});

// @desc Single User
// @route GET /
// @access Public
app.get("/:id", (request, response) => {
  const userID = Number(request.params.id);
  const singleUser = users[userID - 1];
  response.json(singleUser);
});
// start the server in port
app.listen(PORT, () => {
  console.log("app running on port 5000");
});

// /:id param

// /route?id= query
// body

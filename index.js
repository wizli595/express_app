// all imports
import express from "express";
import { data } from "./data.js";

// initial the express app
const app = express();
const PORT = 5000;

const { users } = data;

// @desc Single User by Query
// @route GET /user/query?id=<userId>
// @access Public
app.get("/user/query/", (request, response) => {
  console.log(request.query);
  const userID = Number(request.query.id);
  const singleUser = users[userID - 1];
  return response.json(singleUser);
});

// @desc Single User by ID
// @route GET /user/:id
// @access Public
app.get("/user/:id", (request, response) => {
  const userID = Number(request.params.id);
  const singleUser = users[userID - 1];
  return response.send(singleUser);
});

// @desc All Users
// @route GET /user
// @access Public
app.get("/user", (request, response) => {
  return response.json(users);
});

// start the server in port
app.listen(PORT, () => {
  console.log("app running on port 5000");
});

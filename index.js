// all imports
import express from "express";
import { data } from "./data.js";

// initial the express app
const app = express();
const PORT = 5001;

let { users } = data;
// pour json body
app.use(express.json());
// pour form data dans front-end (react)
app.use(express.urlencoded({ extended: true }));

app.post("/user/create", (request, response) => {
  users = [...users, request.body];
  response.status(201).send(request.body);
});

// @desc Single User by Query
// @route GET /user/query?id=<userId>
// @access Public
app.get("/user/query/", (request, response) => {
  const userID = Number(request.query.id);
  const singleUser = users[userID - 1];

  if (!singleUser)
    return response.status(404).json({ message: "User Not Found" });

  return response.json(singleUser);
  //   if (singleUser) {
  //     return response.json(singleUser);
  //   } else {
  //     return response.status(404).json({ message: "User Not Found" });
  //   }
});

// @desc Single User by ID
// @route GET /user/:id
// @access Public
app.get("/user/:id", (request, response) => {
  const userID = Number(request.params.id);
  const singleUser = users[userID - 1];
  if (!singleUser) {
    return response.status(404).json({ message: "User Not Found" });
  }
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
  console.log("app running on port " + PORT);
});

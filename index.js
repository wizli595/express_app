// all imports
import express, { response } from "express";
import { data } from "./data.js";

// initial the express app
const app = express();
const PORT = 5001;

let { users } = data;
// pour json body
app.use(express.json());
// pour form data dans front-end (react)
app.use(express.urlencoded({ extended: true }));

// @desc Create User
// @route POST /user/create
// @access Public
app.post("/user/create", (request, response) => {
  const { id, name, email } = request.body;
  if (!id || !name || !email)
    return response.status(400).json({ message: "somthing went wrong!!" });
  users = [...users, { id, name, email }];

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

// @desc Update User
// @route PUT /user/update/:id
// @access Public
app.put("/user/update/:id", (request, response) => {
  const userID = Number(request.params.id);
  const { name, username, email } = request.body;
  let singleUser = users[userID - 1];
  if (!singleUser)
    return response.status(404).json({ message: "User Not Found" });
  if (!name || !username || !email)
    return response.status(400).json({ message: "somthing went wrong!!" });
  singleUser.name = name;
  singleUser.username = username;
  singleUser.email = email;
  return response.status(200).send(singleUser);
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

import { Router } from "express";
import { data } from "../data.js";
const route = new Router();

let { users } = data;

const idValidate = (req, res, next) => {
  const userID = Number(req.params.id);
  if (userID > users.length) {
    return res.status(404).json({ message: "User Not Found" });
  } else {
    next();
  }
};

// @desc Create User
// @route POST /user/create
// @access Public
route.post("/create", (request, response) => {
  const { id, name, email } = request.body;
  if (!id || !name || !email)
    return response.status(400).json({ message: "somthing went wrong!!" });
  users = [...users, { id, name, email }];

  response.status(201).send(request.body);
});

// @desc Single User by Query
// @route GET /user/query?id=<userId>
// @access Public
route.get("/query/", (request, response) => {
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

// @desc Delete User
// @route DELETE /user/delete/:id
// @access Public
route.delete("/delete/:id", (request, response) => {
  const userID = Number(request.params.id);
  if (userID > users.length)
    return response.status(404).json({ message: "User Not Found" });
  users = users.filter((item) => item.id !== userID);
  return response.status(200).json({ message: "deleted successfully!!" });
});

// @desc Update User
// @route PUT /user/update/:id
// @access Public
route.put("/update/:id", (request, response) => {
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
route.get("/:id", idValidate, (request, response) => {
  const userID = Number(request.params.id);
  const singleUser = users[userID - 1];
  return response.send(singleUser);
});

// @desc All Users
// @route GET /user
// @access Public
route.get("/", (request, response) => {
  return response.json(users);
});
export default route;

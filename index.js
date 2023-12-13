// all imports
import express from "express";

// initial the express app
const app = express();
const PORT = 5000;

app.get("/", (request, response) => {
  response.send("API IS RUNNING....");
});

// /:id param
// /route?id= query
// body

// start the server in port
app.listen(PORT, () => {
  console.log("app running on port 5000");
});

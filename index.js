// import { data } from "./data.js";

// data.map((e) => {
//   console.log(e);
// });
import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("app running on port 5000");
});
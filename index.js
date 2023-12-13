// all imports
import express, { response } from "express";
import { data } from "./data.js";
import userRoute from "./routes/userRoute.js";
// initial the express app
const app = express();
const PORT = 5001;

// pour json body
app.use(express.json());
// pour form data dans front-end (react)
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);

// start the server in port
app.listen(PORT, () => {
  console.log("app running on port " + PORT);
});

import express from "express";
import middleware from "./middleware.js";
import route from "./route.js";
const app = express();
app.use(middleware);
app.use(route);
app.listen(3000, () => {
  console.log(
    "Server is up and running on port 3000! Ready to handle requests."
  );
});

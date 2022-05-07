const express = require("express");
const connect = require("./config/db");
const app = express();
const userController = require("./controllers/user.controller");
const bookController = require("./controllers/book.controller");
const publicationController = require("./controllers/publication.controller");
const commentController = require("./controllers/comment.controller");

app.use(express.json());

app.use("/users", userController);
app.use("/books", bookController);
app.use("/publications", publicationController);
app.use("/comments", commentController);

app.listen(8000, async () => {
  try {
    await connect();
    console.log("Listening on port 8000");
  } catch (err) {
    console.log(err.message);
  }
});
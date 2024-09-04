const { nanoid } = require("nanoid");
const path = require("path");
const express = require("express");
const app = express();
const comments = require("./comments");
const methodOverride = require("method-override");
// const { addPost } = require("./handler");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.json({ comments: comments });
});

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/create", (req, res) => {
  res.render("comments/create");
});

app.post("/comments", (req, res) => {
  const id = nanoid(8);
  const { username, text } = req.body;
  const newComment = { id, username, text };
  comments.push(newComment);
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find(comment => comment.id === id);
  res.render("comments/show", {
    comment,
  });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find(comment => comment.id === id);
  res.render("comments/edit", {
    comment,
  });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.text;
  const foundComment = comments.find(comment => comment.id === id);
  foundComment.text = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  let foundComment = comments.find(comment => comment.id === id);
  comments.splice(comments.indexOf(foundComment), 1);
  console.log(comments);
  res.redirect("/comments");
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

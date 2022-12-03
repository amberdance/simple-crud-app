const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
const port = 8090;

const { users } = require("./users.js");
const usersRoute = "/api/users/";

app.use(cors());
app.use(formidable());

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});

//index
app.get(usersRoute, (req, res) => {
  res.json(users);
});

//show
app.get(usersRoute + ":id", (req, res) => {
  const user = users.filter(({ id }) => id == Number(req.params.id));

  if (user.length) res.json(user);
  else res.sendStatus(404);
});

//create
app.post(usersRoute, (req, res) => {
  const user = {
    id: getRanomInt(999, 99999),
    first_name: null,
    last_name: null,
    patronymic: null,
    birthday: null,
    city: null,
    email: null,
    phone: null,
    citizenship: false,
    image: "http://placeimg.com/640/480/any",
  };

  for (let key in req.fields) {
    if (key == "id") continue;

    user[camelToSnakeCase(key)] = req.fields[key];
  }

  users.push(user);

  res.json(user);
});

app.patch(usersRoute + ":id", (req, res) => {
  const user = users.filter(({ id }) => id == req.params.id);

  if (!user.length) res.sendStatus(404);

  for (const key in req.fields) {
    if (key == "id") continue;

    user[0][camelToSnakeCase(key)] = req.fields[key];
  }

  res.json(user[0]);
});

app.delete(usersRoute + ":id", (req, res) => {
  res.sendStatus(200);
});

//massive delete
app.post(usersRoute + "remove", (req, res) => {
  res.sendStatus(200);
});

app.post(usersRoute + "upload-avatar", (req, res) => {
  res.json({
    id: Number(req.fields.id),
    image: "http://placeimg.com/640/480/any",
  });
});

app.post(usersRoute + "detach-avatar", (req, res) => {
  res.sendStatus(200);
});

const camelToSnakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((s) => s.toLowerCase())
    .join("_");

const getRanomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

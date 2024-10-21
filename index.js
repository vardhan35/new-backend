const express = require("express");
const bodyParser = require("body-parser");
const client = require("./database/connection");
require("./database/connection");
const db = require("./database/queries");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({
    info: "Hello world!",
  });
});

app.get("/students", db.getStudents);
app.get("/students/:id", db.getStudentById);
app.put("/students", db.updateStudent);
app.post("/students", db.createStudent);
app.post("/students/delete", db.deleteStudent);

app.listen(port, () => {
  console.log("Server is running on " + port);
});

const Response = require("./response");
const client = require("./connection");

const createStudent = (request, response) => {
  const { name, marks, id } = request.body;
  var responseReturn = new Response();
  client.query(
    "INSERT INTO students (name, marks, id) VALUES ($1, $2, $3)",
    [name, marks, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("Student added");
    }
  );
};

const getStudentById = (request, response) => {
  var responseReturn = new Response();
  const id = parseInt(request.params.id);
  client.query(
    "SELECT * FROM students WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount == 0) {
        responseReturn.status = true;
        responseReturn.code = 404;
        responseReturn.message = "User not found";
        responseReturn.data = null;
      } else {
        responseReturn.status = true;
        responseReturn.code = 200;
        responseReturn.message = "Success";
        responseReturn.data = results.rows[0];
      }
      response.status(200).json(responseReturn);
    }
  );
};

const getStudents = (request, response) => {
  var responseReturn = new Response();
  client.query("SELECT * FROM students", (error, results) => {
    if (error) {
      throw error;
    }

    responseReturn.status = true;
    responseReturn.code = 200;
    responseReturn.message = "Success";
    responseReturn.data = results.rows;

    response.status(200).json(responseReturn);
  });
};

const updateStudent = (request, response) => {
  console.log("request.body", request.body);
  var responseReturn = new Response();
  try {
    const { name, marks, id } = request.body;
    console.log("request.body", request.body);
    client.query(
      "UPDATE students SET name = $1, marks = $2 WHERE id = $3",
      [name, marks, id],
      (error, results) => {
        if (error) {
          throw error;
        }

        responseReturn.status = true;
        responseReturn.code = 200;
        responseReturn.message = "User modification successed";
        responseReturn.data = null;
        response.status(200).send(responseReturn);
      }
    );
  } catch (error) {
    responseReturn.status = false;
    responseReturn.code = 500;
    responseReturn.message = error.message;
    responseReturn.data = null;
    response.status(500).json(responseReturn);
  }
};

const deleteStudent = (request, response) => {
  const id = request.body.id;
  console.log("id here----->", id);
  client.query("DELETE FROM students WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send("Student deleted");
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

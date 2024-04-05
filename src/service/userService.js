import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "be-jwt",
  });
  return connection;
};

const createNewUser = async (email, password, username) => {
  const hashed = hashPassword(password);

  try {
    // create the connection to database
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "be-jwt",
    });

    // execute will internally call prepare and query
    const [results, fields] = await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, hashed, username]
    );

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
};

const getUsersList = async () => {
  try {
    const connection = await createConnection();
    const [results, fields] = await connection.query("SELECT * FROM users");
    console.log("check results", results);
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword, createNewUser, getUsersList };
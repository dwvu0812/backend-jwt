import mysql from "mysql2/promise";

const helloWorld = (req, res) => {
  return res.render("home.ejs");
};

const user = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = async (req, res) => {
  console.log("check body", req.body);
  const { email, password, username } = req.body;

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
      [email, password, username]
    );

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }

  res.send("Create new user");
};

module.exports = {
  helloWorld,
  user,
  handleCreateNewUser,
};

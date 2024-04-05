import { createNewUser, getUsersList } from "../service/userService";

const helloWorld = (req, res) => {
  return res.render("home.ejs");
};

const user = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = async (req, res) => {
  console.log("check body", req.body);
  const { email, password, username } = req.body;
  await createNewUser(email, password, username);
  await getUsersList();
  res.send("Create new user");
};

module.exports = {
  helloWorld,
  user,
  handleCreateNewUser,
};

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
  await handleGetUsersList();
  res.send("Create new user");
};

const handleGetUsersList = async (req, res) => {
  const users = await getUsersList();
  res.render("user.ejs", { users });
};

module.exports = {
  helloWorld,
  user,
  handleCreateNewUser,
  handleGetUsersList,
};

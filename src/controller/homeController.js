import {
  createNewUser,
  getUsersList,
  deleteUser,
  updateUser,
  getUserById,
} from "../service/userService";

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
  res.redirect("/user");
};

const handleGetUsersList = async (req, res) => {
  const users = await getUsersList();
  res.render("user.ejs", { users });
};

const handleDeleteUser = async (req, res) => {
  const { id } = req.params;
  console.log("Check ~ handleDeleteUser ~ id:", id);
  await deleteUser(id);
  res.redirect("/user");
};

const handleUpdateUser = async (req, res) => {
  console.log("check req >>>", req.params, req.body);
  const { id } = req.params;
  const { email, username } = req.body;
  await updateUser(id, email, username);
  res.redirect("/user");
};

const getUpdateUser = async (req, res) => {
  const { id } = req.params;
  console.log("Check ~ getUpdateUser ~ id:", id);
  const user = await getUserById(id);
  console.log("Check ~ getUpdateUser ~ user:", user);
  // const user = {};
  res.render("update-user.ejs", { userData: user.dataValues });
};

module.exports = {
  helloWorld,
  user,
  handleCreateNewUser,
  handleGetUsersList,
  handleDeleteUser,
  handleUpdateUser,
  getUpdateUser,
};

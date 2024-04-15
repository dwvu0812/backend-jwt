import db from "../../db/models/index";

const getAllUsers = async () => {
  try {
    const users = await db.User.findAll({
      attributes: ["id", "email", "username", "email", "address", "phone"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    return users;
  } catch (error) {
    throw new Error("Error while fetching users");
  }
};

const getAllUsersWithPagination = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const usersData = await db.User.findAndCountAll({
      limit: +limit,
      offset: offset,
    });
    return usersData;
  } catch (error) {
    throw new Error("Error while fetching users hehe");
  }
};

const createUser = async (data) => {
  try {
    await db.User.create({});
  } catch (error) {
    console.log("Error while creating user");
  }
};

const updateUser = async (data) => {
  try {
    await db.User.update({}, { where: { id: data.id } });
  } catch (error) {
    console.log("Error while updating user");
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({ where: { id: id } });
  } catch (error) {
    console.log("Error while deleting user");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllUsersWithPagination,
};

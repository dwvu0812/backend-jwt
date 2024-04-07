import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import db from "../../db/models/index.js";
import user from "../../db/models/user.js";

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
    await db.User.create({
      email,
      password: hashed,
      username,
    });
  } catch (err) {
    console.log(err);
  }
};

const getUsersList = async () => {
  try {
    const users = await db.User.findAll();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    await await db.User.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (id, email, username) => {
  try {
    await db.User.update(
      {
        email,
        username,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export {
  hashPassword,
  createNewUser,
  getUsersList,
  deleteUser,
  updateUser,
  getUserById,
};

import db from "../../db/models/index.js";
import { hashPassword } from "./userService.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

const checkEmailExist = async (email) => {
  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    return true;
  }

  return false;
};

const checkPhoneExist = async (phone) => {
  const user = await db.User.findOne({
    where: {
      phone: phone,
    },
  });

  if (user) {
    return true;
  }

  return false;
};

const checkPassword = async (inputPassword, hashPassword) => {
  return await bcrypt.compareSync(inputPassword, hashPassword);
};

const registerUser = async (data) => {
  const { email, username, phone, password } = data;

  const isEmailExist = await checkEmailExist(email);
  const isPhoneExist = await checkPhoneExist(phone);

  if (isEmailExist) {
    return {
      message: "Email is already in use",
      code: "-1",
    };
  }

  if (isPhoneExist) {
    return {
      message: "Phone is already in use",
      code: "-1",
    };
  }

  try {
    const hashed = hashPassword(password);
    const newUser = await db.User.create({
      email,
      username,
      phone,
      password: hashed,
    });

    return {
      message: "Register successfully",
      code: "1",
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something went wrong in service...",
      code: "-1",
    };
  }
};

const loginUser = async (data) => {
  const { emailPhone, password } = data;

  console.log("Check ~ loginUser ~ loginUser:", emailPhone);

  const user = await db.User.findOne({
    where: {
      [Op.or]: [
        {
          email: emailPhone,
        },
        {
          phone: emailPhone,
        },
      ],
    },
  });

  if (!user) {
    return {
      message: "User not found",
      code: "-1",
    };
  }

  const isMatch = await checkPassword(password, user.password);
  console.log("Check ~ loginUser ~ isMatch:", isMatch);

  if (!isMatch) {
    return {
      message: "Password is incorrect",
      code: "-1",
    };
  }

  return {
    message: "Login successfully",
    code: "1",
    data: user,
  };
};

module.exports = { registerUser, loginUser };

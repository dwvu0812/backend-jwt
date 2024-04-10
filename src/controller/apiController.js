// const { registerUser } = require("../service/loginRegisterService");
import { registerUser, loginUser } from "../service/loginRegisterService";

const testApi = (req, res) => {
  return res.status(200).json({ message: "API is working" });
};

const handleRegister = async (req, res) => {
  console.log("check req ", req.body);

  try {
    const { email, username, phone, password } = req.body;
    if (!email || !username || !phone || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields", code: "-1", data: "" });
    }

    // service: create new user
    const data = await registerUser(req.body);

    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: { email, username, phone, password },
    });
  } catch (error) {
    res.status(500).json({ message: "error", code: "-1", data: "" });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { emailPhone, password } = req.body;
    if (!emailPhone || !password) {
      return res
        .status(400)
        .json({ message: "Missing required fields", code: "-1", data: "" });
    }

    // service: create new user
    const data = await loginUser(req.body);

    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: "",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "login error >>>", code: "-1", data: "" });
  }
};

module.exports = { testApi, handleRegister, handleLogin };

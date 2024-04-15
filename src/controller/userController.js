import userApiService from "../service/userApiService";

const readUser = async (req, res) => {
  try {
    console.log("read user", req.query);

    if (req.query.page && req.query.limit) {
      const { page, limit } = req.query;
      console.log("page, limit", page, limit);
      const { count, rows } = await userApiService.getAllUsersWithPagination(
        page,
        limit
      );
      const totalPages = Math.ceil(count / limit);
      const data = { users: rows, totalPages, currentPage: page, count };
      res.status(200).json({ error: "", code: "200", data: data });
    } else {
      const users = await userApiService.getAllUsers();
      res.status(200).json({ error: "", code: "200", data: users });
    }
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    res.send("user create");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "error from server", code: "-1", data: "" });
  }
};

const updateUser = (req, res) => {
  try {
    res.send("user update");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "error from server", code: "-1", data: "" });
  }
};

const deleteUser = (req, res) => {
  try {
    res.send("user delete");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "error from server", code: "-1", data: "" });
  }
};

module.exports = { readUser, createUser, updateUser, deleteUser };

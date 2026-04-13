const userService = require("../services/user.service");
const asyncHandler = require("../middlewares/asyncHandler");
const { sendSuccess } = require("../utils/response.util");
const MESSAGES = require("../constants/message");
const { generateCSV } = require("../utils/csv.util");

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  return sendSuccess(res, user, MESSAGES.CREATE_SUCCESS);
});

const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const users = await userService.getUsers(page, limit);
  return sendSuccess(res, users);
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  return sendSuccess(res, null, MESSAGES.DELETE_SUCCESS);
});

const exportUsers = asyncHandler(async (req, res) => {
  const users = await userService.exportUsers(req.body.ids);

  const csv = generateCSV(users);

  res.header("Content-Type", "text/csv");
  res.attachment("users.csv");
  res.send(csv);
});

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  exportUsers,
};

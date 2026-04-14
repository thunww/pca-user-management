const userRepo = require("../repositories/user.repository");
const AppError = require("../exceptions/appError");
const MESSAGES = require("../constants/message");
const HTTP_STATUS = require("../constants/httpStatus");

const createUser = async (data) => {
  try {
    const existing = await userRepo.findByEmail(data.email);

    if (existing) {
      throw new AppError(MESSAGES.EMAIL_EXISTS, HTTP_STATUS.BAD_REQUEST);
    }

    const user = await userRepo.createUser(data);
    delete user.password;

    return user;
  } catch (err) {
    if (err.code === "P2002") {
      throw new AppError(MESSAGES.EMAIL_EXISTS, HTTP_STATUS.BAD_REQUEST);
    }
    throw err;
  }
};

const getUsers = async (page, limit, sortBy, sortOrder, search) => {
  return await userRepo.getUsers(
    Number(page),
    Number(limit),
    sortBy,
    sortOrder,
    search,
  );
};

const deleteUser = async (id) => {
  const user = await userRepo.findById(id);

  if (!user || user.deleted) {
    throw new AppError(MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  await userRepo.softDelete(id);
};

const exportUsers = async (ids) => {
  if (!ids.length) {
    throw new AppError("No users selected", HTTP_STATUS.BAD_REQUEST);
  }

  const users = await userRepo.getUsersByIds(ids);

  if (!users.length) {
    throw new AppError("No valid users", HTTP_STATUS.NOT_FOUND);
  }

  return users;
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  exportUsers,
};

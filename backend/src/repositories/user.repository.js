const prisma = require("../config/prisma");

const createUser = (data) => prisma.user.create({ data });

const findByEmail = (email) => prisma.user.findUnique({ where: { email } });

const findById = (id) => prisma.user.findUnique({ where: { id } });

const getUsers = (page, limit) =>
  prisma.user.findMany({
    where: { deleted: false },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });

const softDelete = (id) =>
  prisma.user.update({
    where: { id },
    data: { deleted: true },
  });

const getUsersByIds = (ids) =>
  prisma.user.findMany({
    where: {
      id: { in: ids },
      deleted: false,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });

module.exports = {
  createUser,
  findByEmail,
  findById,
  getUsers,
  softDelete,
  getUsersByIds,
};

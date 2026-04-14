const prisma = require("../config/prisma");

const createUser = (data) => prisma.user.create({ data });

const findByEmail = (email) => prisma.user.findUnique({ where: { email } });

const findById = (id) => prisma.user.findUnique({ where: { id } });

const getUsers = async (
  page,
  limit,
  sortBy = "createdAt",
  sortOrder = "desc",
  search = "",
) => {
  const where = {
    deleted: false,
    ...(search && {
      OR: [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
      ],
    }),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total };
};

const softDelete = (id) =>
  prisma.user.update({ where: { id }, data: { deleted: true } });

const getUsersByIds = (ids) =>
  prisma.user.findMany({
    where: { id: { in: ids }, deleted: false },
    select: { id: true, email: true, firstName: true, lastName: true },
  });

module.exports = {
  createUser,
  findByEmail,
  findById,
  getUsers,
  softDelete,
  getUsersByIds,
};

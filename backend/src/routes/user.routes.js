const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const {
  createUserSchema,
  exportSchema,
} = require("../validators/user.validator");

router.get("/users", userController.getUsers);

router.post("/users", validate(createUserSchema), userController.createUser);

router.delete("/users/:id", userController.deleteUser);

router.post(
  "/users/export",
  validate(exportSchema),
  userController.exportUsers,
);

module.exports = router;

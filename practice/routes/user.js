const express = require("express");
const router = express.Router();
const {
  //createUser,
  //loginUser,
  getAllUsers,
  getSingleUser,
  //deleteUser,
  //updateUser,
} = require("../controllers/user");

// const {
//   validSignUp,
//   validLogin,
// } = require("../middlewares/validations/userValidations");

//const isAuthorized = require("../middlewares/authorization/isAuthorize");

// router.post(
//   "/register",
//   isAuthorized(["super-admin", "admin", "lead"]),
//   createUser
// );
//router.post("/login", loginUser);
router.get("/users/list", getAllUsers);
router.get("/:id", getSingleUser);
//router.put("/update/:id", updateUser);
//router.delete("/delete/:id", deleteUser);

module.exports = router;

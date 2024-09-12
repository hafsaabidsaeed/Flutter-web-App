const User = require("../models/user");
//const { STATUS_CODE, ERRORS, SUCCESS_MSG } = require("../constants/index");
const authService = require("../services/authService");

const createUser = async (req, res) => {

  try {

    const {
      firstname,
      lastname,
      email,
      password,
      role,
    } = req.body;

    // Hash password
    const hashPassword = await authService.hashPassword(password);

    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashPassword,
      role: role || "employee",
    };

    await User.create(newUser);

    return res
      .status(201)
      .json({ success: true, message: "user has been registered" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Internal server error",
      });
    } else {
      return res.status(500).json({ 
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};

// const loginUser = async (req, res) => {

//   try {

//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (user) {
//       const isMatch = await authService.comparePassword(
//         password,
//         user.password
//       );

//       // User data
//       const userData = {
//         id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         department: user.department,
//       };
//       if (isMatch) {
//         const token = await authService.generateToken(userData);

//         return res.status(STATUS_CODE.OK).json({
//           success: true,
//           message: SUCCESS_MSG.AUTH_MSG.LOGIN_SUCCESS,
//           user: userData,
//           token: token,
//         });
//       } else {
//         return res.status(STATUS_CODE.BAD_REQUEST).json({
//           success: false,
//           message: ERRORS.INVALID.INVALID_LOGIN_CREDENTIALS,
//         });
//       }
//     } else {
//       return res
//         .status(STATUS_CODE.NOT_FOUND)
//         .json({ success: false, message: ERRORS.INVALID.USER_NOT_EXISTS });
//     }
//   } catch (error) {
//     //onsole.log("Login error:", error);
//     return res.status(STATUS_CODE.SERVER_ERROR).json({
//       success: false,
//       message: ERRORS.SERVER_ERROR,
//       error: error.message,
//     });
//   }
// };

const getAllUsers = async (req, res) => {

  try {

    const allUsers = await User.find().select("-password");

    if (allUsers.length > 0) {
      return res.status(200).json({ success: true, data: allUsers });
    } else {
      return res
        .status(404)
        .json({ success: false, data: null });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {

  try {

    const { id } = req.params;

    const singleUser = await User.findById(id, { password: 0 });

    if (!singleUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: singleUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// const updateUser = async (req, res) => {

//   try {

//     const { id } = req.params;
//     const {
//       username,
//       firstname,
//       lastname,
//       email,
//       website,
//       contact_no,
//       address,
//       company_name,
//       password,
//       role,
//       department,
//     } = req.body;

//     let updateUserBody;
//     // If password not empty or null then update password
//     if (password) {
//       const hashedPassword = await authService.hashPassword(password);
//       updateUserBody = {
//         username,
//         firstname,
//         lastname,
//         email,
//         website,
//         contact_no,
//         address,
//         company_name,
//         role,
//         department,
//         password: hashedPassword,
//       };
//     } else {
//       updateUserBody = {
//         username,
//         firstname,
//         lastname,
//         email,
//         website,
//         contact_no,
//         address,
//         company_name,
//         role,
//         department,
//       };
//     }
//     if (req.body == null || Object.keys(req.body).length === 0 || req.body === '') {
//       return res
//         .status(STATUS_CODE.BAD_REQUEST)
//         .json({ success: false, message: ERRORS.REQUIRED.BODY_EMPTY });
//     }

//     const singleUser = await User.findById(id);

//     if (!singleUser) {
//       return res
//         .status(STATUS_CODE.NOT_FOUND)
//         .json({ success: false, message: ERRORS.USER.NOT_FOUND });
//     } else {
//       const userUpdate = await User.findByIdAndUpdate(id, updateUserBody, {
//         new: true,
//       });

//       if (!userUpdate) {
//         return res
//           .status(STATUS_CODE.BAD_REQUEST)
//           .json({ success: false, message: ERRORS.USER.NOT_UPDATED });
//       }

//       return res
//         .status(STATUS_CODE.OK)
//         .json({ success: true, message: SUCCESS_MSG.USER.UPDATED });
//     }
//   } catch (error) {
//     return res.status(STATUS_CODE.SERVER_ERROR).json({
//       success: false,
//       message: ERRORS.ERRORS.SERVER_ERROR,
//       error: error.message,
//     });
//   }
// };

// const deleteUser = async (req, res) => {

//   try {

//     const { id } = req.params;

//     const deletedUser = await User.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return res
//         .status(STATUS_CODE.BAD_REQUEST)
//         .json({ success: false, message: ERRORS.USER.NOT_DELETED });
//     }

//     return res
//       .status(STATUS_CODE.OK)
//       .json({ success: true, message: SUCCESS_MSG.USER.DELETED });
//   } catch (error) {
//     return res.status(STATUS_CODE.SERVER_ERROR).json({
//       success: false,
//       message: ERRORS.ERRORS.SERVER_ERROR,
//       error: error.message,
//     });
//   }
// };

module.exports = {
  createUser,
  //loginUser,
  getAllUsers,
  getSingleUser,
  //updateUser,
  //deleteUser,
};

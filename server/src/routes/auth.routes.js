const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user with email and passwoed and username
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);


/**
 * @route POST /api/auth/logout
 * @description Logout a user by clearing the token cookie
 * @access Public
 */
//authRouter.post("/logout",authController.logoutUserController);

module.exports = authRouter;

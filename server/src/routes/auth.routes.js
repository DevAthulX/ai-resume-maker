const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware");

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
authRouter.post("/logout",authController.logoutUserController);


/**
 * @route GET /api/auth/get-me
 * @description Get the logged in user's details
 * @access Private
 */
authRouter.get("/get-me",authMiddleWare.authUser,authController.getMeController);

module.exports = authRouter;

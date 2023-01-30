import express from "express";
import { UserService } from "../services/userServices";
import { UserController } from "../controllers/userController";

import { knex } from "../db";

export let userRoute = express.Router();

export const userService = new UserService(knex);
export const userController = new UserController(userService);
userRoute.post("/login", userController.login);

userRoute.post("/register", userController.createMember);

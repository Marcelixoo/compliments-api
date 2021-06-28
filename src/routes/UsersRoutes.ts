import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { ListUserController } from "../controllers/ListUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUserController();

usersRoutes.post("/users", createUserController.handle);
usersRoutes.get("/users", listUsersController.handle);

export { usersRoutes }
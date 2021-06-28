import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { CreateTagController } from "../controllers/CreateTagController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { SendComplimentController } from "../controllers/SendComplimentController";
import { ListComplimentsReceivedByUserController } from "../controllers/ListComplimentsReceivedByUserController";
import { ListComplimentsSentByUserController } from "../controllers/ListComplimentsSentByUserController";
import { ListTagsController } from "../controllers/ListTagsController";
import { ListUserController } from "../controllers/ListUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const sendComplimentController = new SendComplimentController();
const listComplimentsReceivedByUserController = new ListComplimentsReceivedByUserController();
const listComplimentsSentByUserController = new ListComplimentsSentByUserController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUserController();

router.post("/users", createUserController.handle);
router.get("/users", listUsersController.handle);
router.get("/users/compliments/received", ensureAuthenticated, listComplimentsReceivedByUserController.handle);
router.get("/users/compliments/sent", ensureAuthenticated, listComplimentsSentByUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, sendComplimentController.handle);

export { router }
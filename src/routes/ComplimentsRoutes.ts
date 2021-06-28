import { Router } from "express";
import { SendComplimentController } from "../controllers/SendComplimentController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListComplimentsReceivedByUserController } from "../controllers/ListComplimentsReceivedByUserController";
import { ListComplimentsSentByUserController } from "../controllers/ListComplimentsSentByUserController";

const complimentsRoutes = Router();

const sendComplimentController = new SendComplimentController();
const listComplimentsReceivedByUserController = new ListComplimentsReceivedByUserController();
const listComplimentsSentByUserController = new ListComplimentsSentByUserController();

complimentsRoutes.post("/compliments", ensureAuthenticated, sendComplimentController.handle);
complimentsRoutes.get("/compliments/received", ensureAuthenticated, listComplimentsReceivedByUserController.handle);
complimentsRoutes.get("/compliments/sent", ensureAuthenticated, listComplimentsSentByUserController.handle);

export { complimentsRoutes }
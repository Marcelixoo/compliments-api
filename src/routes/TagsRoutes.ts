import { Router } from "express";
import { CreateTagController } from "../controllers/CreateTagController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListTagsController } from "../controllers/ListTagsController";

const tagsRoutes = Router();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

tagsRoutes.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
tagsRoutes.get("/tags", ensureAuthenticated, listTagsController.handle);

export { tagsRoutes }
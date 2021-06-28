import { Router } from "express";
import { usersRoutes } from "./UsersRoutes";
import { tagsRoutes } from "./TagsRoutes";
import { authRoutes } from "./AuthenticationRoutes";
import { complimentsRoutes } from "./ComplimentsRoutes";

const router = Router();

router.use(usersRoutes);
router.use(tagsRoutes);
router.use(authRoutes)
router.use(complimentsRoutes)

export { router }
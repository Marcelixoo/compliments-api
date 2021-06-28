import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { ListUsers } from "../services/ListUsers";

class ListUserController {
    async handle(request: Request, response: Response) {
        const listUsers = new ListUsers();

        const users = await listUsers.execute();

        return response.json(users);
    }
}

export { ListUserController }
import { Request, Response } from "express";
import { ListComplimentsSentByUser } from "../services/ListComplimentsSentByUser";

class ListComplimentsSentByUserController {
    async handle(request: Request, response: Response) {
        const listComplimentsSentByUser = new ListComplimentsSentByUser();

        const compliments = await listComplimentsSentByUser.execute(request.user_id);

        return response.json(compliments);
    }
}

export { ListComplimentsSentByUserController }
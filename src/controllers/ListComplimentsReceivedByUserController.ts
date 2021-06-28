import { Request, Response } from "express";
import { ListComplimentsReceivedByUser } from "../services/ListComplimentsReceivedByUser";

class ListComplimentsReceivedByUserController {
    async handle(request: Request, response: Response) {
        const listComplimentsReceivedByUser = new ListComplimentsReceivedByUser();

        const compliments = await listComplimentsReceivedByUser.execute(request.user_id);

        return response.json(compliments);
    }
}

export { ListComplimentsReceivedByUserController }
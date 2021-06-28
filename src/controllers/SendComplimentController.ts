import { Request, Response } from "express";
import { SendComplimentService } from "../services/SendComplimentService";

class SendComplimentController {
    async handle(request: Request, response: Response) {
        const { tag_id, sender_id, receiver_id, message } = request.body;
        const sendComplimentService = new SendComplimentService();

        const compliment = await sendComplimentService.send({
            tag_id,
            sender_id,
            receiver_id,
            message
        });

        return response.json(compliment);
    }
}

export { SendComplimentController }
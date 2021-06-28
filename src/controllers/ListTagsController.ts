import { Request, Response } from "express";
import { ListTags } from "../services/ListTags";

class ListTagsController {
    async handle(request: Request, response: Response) {
        const listTags = new ListTags();

        const tags = await listTags.execute();

        return response.json(tags);
    }
}

export { ListTagsController }
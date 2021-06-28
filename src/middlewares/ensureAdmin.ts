import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AuthenticationError } from "../errors/AuthenticationError";
import { UsersRepository } from "../repositories/UsersRepository";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request;

    const usersRepository = getCustomRepository(UsersRepository);

    const { admin } = await usersRepository.findOne(user_id);

    if (admin) {
        return next();
    }

    throw new AdministrationRightsViolation();
}

class AdministrationRightsViolation extends AuthenticationError {
    constructor() {
        super("This operation requires admin rights.");
    }
}
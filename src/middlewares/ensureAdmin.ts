import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors/AuthenticationError";

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const isAdmin = true;

    if (isAdmin) {
        return next();
    }

    throw new AdministrationRightsViolation();
}

class AdministrationRightsViolation extends AuthenticationError {
    constructor() {
        super("This operation requires admin rights.");
    }
}
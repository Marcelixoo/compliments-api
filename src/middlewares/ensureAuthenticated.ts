import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthenticationError } from "../errors/AuthenticationError";

interface JwtPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const token = extractTokenFromRequest(request);

    try {
        const { sub } = verify(token, "e13fa72aa716245964705c1ab8d8692e") as JwtPayload;

        request.user_id = sub;

        return next();
    } catch (err) {
        throw new InvalidAuthenticationToken();
    }
}

function extractTokenFromRequest(request: Request) {
    const authenticationContext = request.headers.authorization;

    if (!authenticationContext) {
        throw new MissingAuthenticationToken();
    }

    const [, token] = authenticationContext.split(" ");

    if (!token) {
        throw new EmptyAuthenticationToken();
    }

    return token;
}

class MissingAuthenticationToken extends AuthenticationError {
    constructor() {
        super("The authentication token is missing.");
    }
}

class EmptyAuthenticationToken extends AuthenticationError {
    constructor() {
        super("Empty authentication token provided.");
    }
}

class InvalidAuthenticationToken extends AuthenticationError {
    constructor() {
        super("The authentication token provided is invalid.");
    }
}
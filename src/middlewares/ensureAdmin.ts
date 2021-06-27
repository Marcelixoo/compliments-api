import { NextFunction, Request, Response } from "express";

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const isAdmin = true;

    if (isAdmin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized"
    });
}
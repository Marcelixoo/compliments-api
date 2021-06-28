import { BusinessRuleViolation } from "./BusinessRuleViolation";
import { AuthenticationError } from "./AuthenticationError";
import { ValidationError } from "./ValidationError";

class HttpError extends Error {
    statusCode: number;
    json: object;

    constructor(message: string, statusCode: number = 500, json: object) {
        super(message);
        this.statusCode = statusCode;
        this.json = json;
    }

    public static fromApplication(error: any) {
        if (error instanceof ValidationError) {
            return new HttpError(error.message, 422, {
                error: {
                    title: "Validation Error",
                    status: 422,
                    source: error.fieldName,
                    detail: error.message
                }
            })
        }

        if (error instanceof BusinessRuleViolation) {
            return new HttpError(error.message, 400, {
                error: {
                    title: "Business Rule Violation",
                    status: 400,
                    detail: error.message
                }
            });
        }

        if (error instanceof AuthenticationError) {
            return new HttpError(error.message, 401, {
                error: {
                    title: "Unauthorized",
                    status: 401,
                    detail: error.message
                }
            });
        }

        return new HttpError(error.message, 500, {
            errors: {
                title: "Internal Server Error",
                status: 500,
                detail: error.message
            }
        });
    }
}

export { HttpError };
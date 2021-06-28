import { ApplicationError } from "./ApplicationError";

class AuthenticationError extends ApplicationError {
    constructor(message: string) {
        super(message, AuthenticationError.prototype);
    }
}

export { AuthenticationError }
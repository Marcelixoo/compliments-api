import { ApplicationError } from "./ApplicationError";

class ValidationError extends ApplicationError {
    fieldName: string;

    constructor(message: string, fieldName: string) {
        super(message, ValidationError.prototype);
        this.fieldName = fieldName;
    }
}

export { ValidationError };
import { ApplicationError } from "./ApplicationError";

class BusinessRuleViolation extends ApplicationError {
    constructor(message: string) {
        super(message, BusinessRuleViolation.prototype);
    }
}

export { BusinessRuleViolation };
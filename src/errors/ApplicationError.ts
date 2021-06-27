class ApplicationError extends Error {
    constructor(message: string, prototype: any) {
        super(message);
        Object.setPrototypeOf(this, prototype);
    }
}

export { ApplicationError }
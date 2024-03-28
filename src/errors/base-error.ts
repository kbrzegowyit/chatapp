export class BaseError extends Error {
    constructor(
        public readonly name: string,
        public readonly statusCode: number,
        public readonly description: string,
        public readonly isOperational: boolean
    ) {
        super(description);
    }
}
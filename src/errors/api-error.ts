import { BaseError } from "./base-error.js";

export class APIError extends BaseError {
    constructor(
        public readonly name: string,
        public readonly statusCode: number,
        public readonly description: string,
        public readonly isOperational: boolean
    ) {
        super(name, statusCode, description, isOperational);
    }
}
import { APIError } from "../api-error.js";

export class TokenNotFound extends APIError {
    constructor() {
        super('TokenNotFound', 401, 'Token has not been found', true);
    }
}
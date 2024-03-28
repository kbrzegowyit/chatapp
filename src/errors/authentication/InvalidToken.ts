import { APIError } from "../api-error.js";

export class InvalidToken extends APIError {
    constructor() {
        super('InvalidToken', 401, 'Token is invalid', true);
    }
}
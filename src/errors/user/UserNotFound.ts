import { APIError } from "../api-error.js";

export class UserNotFound extends APIError {
    constructor() {
        super('UserNotFound', 404, 'User not found.', true);
    }
}
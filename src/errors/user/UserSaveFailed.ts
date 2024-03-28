import { APIError } from "../api-error.js";

export class UserSaveFailed extends APIError {
    constructor() {
        super('UserSaveFailed', 500, 'Failed to save user.', true);
    }
}
import { APIError } from "../api-error.js";

export class UserDeleteFailed extends APIError {
    constructor() {
        super('UserDeleteFailed', 500, 'Failed to delete user.', true);
    }
}
import { APIError } from "../api-error.js";

export class UserRetrieveFailed extends APIError {
    constructor() {
        super('UserRetrieveFailed', 500, 'Failed to retrieve user.', true);
    }
}
import { APIError } from "../api-error.js";

export class UserExists extends APIError {
    constructor() {
        super('UserExists', 400, 'User already exists', true);
    }
}
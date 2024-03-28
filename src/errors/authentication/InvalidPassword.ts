import { APIError } from "../api-error.js";

export class InvalidPassword extends APIError {
    constructor() {
        super('InvalidPassword', 401, 'Password is invalid', true);
    }
}
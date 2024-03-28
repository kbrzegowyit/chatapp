import { APIError } from "../api-error.js";

export class PasswordNotMatch extends APIError {
    constructor() {
        super('PasswordNotMatch', 400, 'Passwords do not match', true);
    }
}
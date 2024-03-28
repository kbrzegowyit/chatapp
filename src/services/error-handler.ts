import { BaseError } from "../errors/base-error.js";

export interface IErrorHandlerService {
    handleError(error: BaseError): Promise<void>;
    isTrustedError(error: Error): boolean;
}

export class ErrorHandlerService implements IErrorHandlerService {
    async handleError(error: BaseError): Promise<void> {
        console.log(error.name + ': ' + error.message);
    }
    
    isTrustedError(error: Error): boolean {
        return error instanceof BaseError;
    }
    
}
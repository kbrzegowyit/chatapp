import { BaseError } from "../errors/base-error.js";
import { IErrorHandlerService } from "../services/error-handler.js";

export function errorHandlerMiddleware (errorHandlerService: IErrorHandlerService) {
    return async (error: Error, _req: any, res: any, _next: any) => {        
        if (errorHandlerService.isTrustedError(error)) {
            const err = error as BaseError;
            await errorHandlerService.handleError(err);
            res.status(err.statusCode).send(err.message);
        } else {
            console.log('Error: ', error);
            res.status(500).send('Something went wrong!');
        }
    }
}
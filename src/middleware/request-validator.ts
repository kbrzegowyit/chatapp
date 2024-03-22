import Joi from "joi";
import { RequestPayload } from "../schemas/constants.js";

export function requestValidator(schema: RequestPayload) {
    return (req: any, res: any, next: any) => {       
        if (schema.body) {
            const { error } = schema.body.validate(req.body);
            if (error) {
                return handleError(error, res);
            }
            res.locals.body = req.body;
        }

        if (schema.params) {
            const { error } = schema.params.validate(req.params);
            if (error) {
               return handleError(error, res);
            }
            res.locals.params = req.params;
        }

        if (schema.query) {
            const { error } = schema.query.validate(req.query);
            if (error) {
               return handleError(error, res);
            }
            res.locals.query = req.query;
        }
        
        next();
    }
}

function handleError(error: Joi.ValidationError, res: any) {
    const errorMessage = error.details.map((d: any) => d.message).join(', ');
    console.error(errorMessage);
    return res.status(400).json({ errorMessage });
}
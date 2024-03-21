import Joi from "joi";
import { CreateUserInputDto, DeleteUserInputDto, RetrieveUserInputDto } from "../dtos/user.js";

export type RequestPayload = { body?: Joi.ObjectSchema<any>, params?: Joi.ObjectSchema<any>, query?: Joi.ObjectSchema<any> };
export type RequestSchema = { [key: string]: RequestPayload };

export const USER_SCHEMA = {
    CREATE: {
        body: Joi.object({
            nick: Joi.string().required(),
            password: Joi.string().required(),
        }) as Joi.ObjectSchema<CreateUserInputDto>,
    },
    RETRIEVE: {
        params: Joi.object({
            id: Joi.number().integer().required(),
        }) as Joi.ObjectSchema<RetrieveUserInputDto>,
    },
    DELETE: {
        params: Joi.object({
            id: Joi.number().integer().required(),
        }) as Joi.ObjectSchema<DeleteUserInputDto>,
    },
} as RequestSchema;

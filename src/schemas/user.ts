import Joi from "joi";
import { CreateUserInputDto, DeleteUserInputDto, RetrieveUserInputDto } from "../dtos/user.js";
import { RequestSchema } from "./constants.js";

export const USER_SCHEMA: RequestSchema = {
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
};

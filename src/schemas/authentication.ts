import Joi from "joi";
import { RequestSchema } from "./constants.js";
import { LoginUserInputDto, RegisterUserInputDto } from "../dtos/authentication.js";

export const  AUTHENTICATION_SCHEMA: RequestSchema = {
    LOGIN: {
        body: Joi.object({
            nick: Joi.string().required(),
            password: Joi.string().required(),
        }) as Joi.ObjectSchema<LoginUserInputDto>,
    },
    REGISTER: {
        body: Joi.object({
            nick: Joi.string().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        }) as Joi.ObjectSchema<RegisterUserInputDto>,
    },
};

import Joi from "joi";
import { RequestSchema } from "./constants.js";
import { LoginUserInputDto, RegisterUserInputDto } from "../dtos/authentication.js";

const USER_SCHEMA = {
    NICK: Joi.string().min(3).required(),
    PASSWORD: Joi.string().min(5).required(),
};

export const  AUTHENTICATION_SCHEMA: RequestSchema = {
    LOGIN: {
        body: Joi.object({
            nick: USER_SCHEMA.NICK,
            password: USER_SCHEMA.PASSWORD,
        }) as Joi.ObjectSchema<LoginUserInputDto>,
    },
    REGISTER: {
        body: Joi.object({
            nick: USER_SCHEMA.NICK,
            password: USER_SCHEMA.PASSWORD,
            confirmPassword: USER_SCHEMA.PASSWORD,
        }) as Joi.ObjectSchema<RegisterUserInputDto>,
    },
};

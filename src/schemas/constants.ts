import Joi from "joi";

export type RequestPayload = { body?: Joi.ObjectSchema<any>, params?: Joi.ObjectSchema<any>, query?: Joi.ObjectSchema<any> };
export type RequestSchema = { [key: string]: RequestPayload };

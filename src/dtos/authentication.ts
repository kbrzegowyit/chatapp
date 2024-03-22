import { InferAttributes } from "@sequelize/core";
import { User } from "../models/user.js";

type UserAttributes = InferAttributes<User>;

// -- Local DTOs -- //

export interface LoginUserLocalsDto {
    body: LoginUserInputDto;
};

export interface RegisterUserLocalsDto {
    body: RegisterUserInputDto;
};

// -- Input DTOs -- //

export interface LoginUserInputDto {
    nick: UserAttributes['nick'];
    password: UserAttributes['password'];
};

export interface RegisterUserInputDto {
    nick: UserAttributes['nick'];
    password: UserAttributes['password'];
    confirmPassword: UserAttributes['password'];
};

// -- Output DTOs -- //

export type LoginUserOutputDto = Omit<UserAttributes, 'password'>;

export type RegisterUserOutputDto = Omit<UserAttributes, 'password'>;

import { UserAttributes } from "./constants.js";

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

export type LoginUserOutputDto = string;

export type RegisterUserOutputDto = string;

import { InferAttributes } from "@sequelize/core";
import { User } from "../models/user.js";

type UserAttributes = InferAttributes<User>;

// -- Local DTOs -- //

export interface CreateUserLocalsDto {
    body: CreateUserInputDto;
};

export interface RetrieveUserLocalsDto {
    params: RetrieveUserInputDto;
};

export interface DeleteUserLocalsDto {
    params: DeleteUserInputDto;
};

// -- Input DTOs -- //

export interface CreateUserInputDto {
    nick: UserAttributes['nick'];
    password: UserAttributes['password'];
};

export interface RetrieveUserInputDto {
    id: UserAttributes['id'];
};

export interface DeleteUserInputDto {
    id: UserAttributes['id'];
};

// -- Output DTOs -- //

export type CreateUserOutputDto = Omit<UserAttributes, 'password'>;

export type RetrieveUserOutputDto = Omit<UserAttributes, 'password'>;

export type DeleteUserOutputDto = Pick<UserAttributes, 'id'>;
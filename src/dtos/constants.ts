import { InferAttributes } from "@sequelize/core";
import { User } from "../models/user.js";

export type UserAttributes = InferAttributes<User>;

import { InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';
import { DataTypes } from "@sequelize/core";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: number;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare nick: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare password: string;
}
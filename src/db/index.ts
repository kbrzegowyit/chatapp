import { Sequelize } from "@sequelize/core";
import { User } from "../models/user.js";

export class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connect();
    }
    // Handle environment variables
    private async connect() {
        this.sequelize = new Sequelize({
            database: 'chat_app',
            username: 'chat_app',
            password: 'chat_app_123',
            host: 'localhost',
            dialect: 'postgres',
            pool: {
                max: 5,
                min: 0,
                idle: 10000,
                acquire: 30000,
            },
            models: [User],
        });

        try {
            await this.sequelize.sync();
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
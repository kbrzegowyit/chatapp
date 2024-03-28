import { UserDeleteFailed } from "../errors/user/UserDeleteFailed.js";
import { UserRetrieveFailed } from "../errors/user/UserRetrieveFailed.js";
import { UserSaveFailed } from "../errors/user/UserSaveFailed.js";
import { User } from "../models/user.js";

export interface IUserRepository {
    save(user: User): Promise<User>;
    retrieveById(id: number): Promise<User | null>;
    delete(id: number): Promise<number>;
    findByNick(nick: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
    public async save(user: User): Promise<User> {
        try {
            return await user.save();
        } catch (error) {
            throw new UserSaveFailed();
        }
    }
    public async retrieveById(id: number): Promise<User | null> {
        try {
            return await User.findByPk(id);
        } catch (error) {
            throw new UserRetrieveFailed();
        }
    }
    public async delete(id: number): Promise<number> {
        try {
            return await User.destroy({ where: { id } });
        } catch (error) {
            throw new UserDeleteFailed();
        }
    }
    public async findByNick(nick: string): Promise<User | null> {
        try {
            return await User.findOne({ where: { nick } });
        } catch (error) {
            throw new UserRetrieveFailed();
        }
    }
}
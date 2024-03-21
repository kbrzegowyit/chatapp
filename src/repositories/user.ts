import { User } from "../models/user.js";

export interface IUserRepository {
    save(user: User): Promise<User>;
    retrieveById(id: number): Promise<User | null>;
    delete(id: number): Promise<number>;
}

export class UserRepository implements IUserRepository {
    public async save(user: User): Promise<User> {
        try {
            return user.save();
        } catch (error) {
            console.log('UserRepository.error:', error);
            throw new Error("Failed to create user.");
        }
    }
    public async retrieveById(id: number): Promise<User | null> {
        try {
            return await User.findByPk(id);
        } catch (error) {
            throw new Error("Failed to retrieve user.");
        }
    }
    public async delete(id: number): Promise<number> {
        try {
            return await User.destroy({ where: { id } });
        } catch (error) {
            throw new Error("Failed to delete user.");
        }
    }

}
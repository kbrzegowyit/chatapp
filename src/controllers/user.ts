import { IUserService } from "../services/user.js";

export interface IUserController {
    createUser(req: any, res: any): Promise<void>;
    retrieveUser(req: any, res: any): Promise<void>;
    deleteUser(req: any, res: any): Promise<void>;
}

export class UserController {
    constructor(private readonly userService: IUserService) {}
    // Add request parameters parsing
    public async createUser(req: any, res: any) {
        const user = req.body;
        const createdUser = await this.userService.createUsers(user);
        res.json(createdUser);
    }

    public async retrieveUser(req: any, res: any) {
        const id = req.params.id;
        const user = await this.userService.retrieveUserById(id);
        res.json(user);
    }

    public async deleteUser(req: any, res: any) {
        const id = req.params.id;
        const deletedUser = await this.userService.deleteUser(id);
        res.json(deletedUser);
    }
}
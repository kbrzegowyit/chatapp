import { Router } from "express";
import { ViewsRoutes } from "./constatns.js";
import { ISecureTokenService } from "../services/secure-token.js";

enum Template {
    LOGIN = 'login',
    REGISTER = 'register',
    CHAT = 'chat'
}

export class ViewRouter {
    public readonly router: Router;

    constructor(private readonly secureTokenService: ISecureTokenService) {
        this.router = Router();
        this.router.get(ViewsRoutes.LOGIN, async (req, res) => {
            const isAuthenticated = await this.isAuthenticated(req.cookies.token);

            if (isAuthenticated) {
                return res.redirect(Template.CHAT);
            }
            
            res.render(Template.LOGIN);
        });
        this.router.get(ViewsRoutes.REGISTER, async (req, res) => {
            const isAuthenticated = await this.isAuthenticated(req.cookies.token);

            if (isAuthenticated) {
                return res.redirect(Template.CHAT);
            }

            res.render(Template.REGISTER);
        });
        this.router.get(ViewsRoutes.CHAT, async (req, res) => {
            const isAuthenticated = await this.isAuthenticated(req.cookies.token);

            if (!isAuthenticated) {
                return res.render(Template.LOGIN);
            }
            
            res.render(Template.CHAT);
        });
    }

    private async isAuthenticated(token: string | undefined) {
        try {
            if (!token) return false;
            this.secureTokenService.verifyToken(token);
            return true;
        } catch (error) {
            return false;
        }
    }
}
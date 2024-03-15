import { Router } from "express";
import { ViewsRoutes } from "./constatns.js";

export class ViewRouter {
    public readonly router: Router;

    constructor() {
        this.router = Router();
        this.router.get(ViewsRoutes.LOGIN, (_req, res) => {
            res.render('login');
        });
        this.router.get(ViewsRoutes.REGISTER, (_req, res) => {
            res.render('register');
        });
        this.router.get(ViewsRoutes.CHAT, (_req, res) => {
            res.render('chat');
        });
    }
}
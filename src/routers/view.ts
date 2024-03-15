import { Router } from "express";
import { DefaultRoutes, ViewsRoutes } from "./constatns.js";

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
        this.router.get(DefaultRoutes.OTHERS, (_req, res) => {
            res.render('404');
        });
    }
}
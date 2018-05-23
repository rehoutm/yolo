import { Router } from "express";
import SessionController from "../Controllers/SessionController";

class UsersRouter {

    router: Router;
    private sessionController: SessionController;

    constructor() {
        this.router = Router();
        this.sessionController = new SessionController();
        this.router.post("/session", async (req, res) => await this.sessionController.HandlePost(req, res));
    }
}

export default new UsersRouter().router;
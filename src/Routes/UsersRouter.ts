import { Router } from "express";
import SessionController from "../Controllers/SessionController";
import RegistrationController from "../Controllers/RegistrationController";

class UsersRouter {

    router: Router;
    private sessionController: SessionController;
    private registrationController: RegistrationController;

    constructor() {
        this.router = Router();
        this.sessionController = new SessionController();
        this.registrationController = new RegistrationController();
        this.router.post("/session", async (req, res) => await this.sessionController.HandlePost(req, res));
        this.router.post("/registration", async (req, res) => await this.registrationController.HandlePost(req, res));
    }
}

export default new UsersRouter().router;
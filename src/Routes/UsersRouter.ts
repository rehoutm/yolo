import { Router } from "express";
import SessionController from "../Controllers/SessionController";
import RegistrationController from "../Controllers/RegistrationController";
import { body, validationResult } from "express-validator/check";
import { HandleErrors } from "../Middleware/ValidationErrorsHandler";

class UsersRouter {

    router: Router;
    private sessionController: SessionController;
    private registrationController: RegistrationController;

    constructor() {
        this.router = Router();
        this.sessionController = new SessionController();
        this.registrationController = new RegistrationController();
        this.router.post("/session", [
            body("email").isEmail(),
            body("password").not().isEmpty(),
            HandleErrors
        ], async (req, res) => await this.sessionController.HandlePost(req, res));
        this.router.post("/registration", [
            body("email").isEmail(),
            body("password").not().isEmpty(),
            body("passwordCheck").custom((value, options) => {
                if (value !== options.req.body.password) {
                    throw new Error("Passwords do not match");
                } else {
                    return value;
                }
            }),
            HandleErrors
        ], async (req, res) => await this.registrationController.HandlePost(req, res));
    }
}

export default new UsersRouter().router;

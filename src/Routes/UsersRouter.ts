import { Router } from "express";
import { body } from "express-validator/check";
import RegistrationController from "../Controllers/RegistrationController";
import SessionController from "../Controllers/SessionController";
import { HandleErrors } from "../Middleware/ValidationErrorsHandler";

class UsersRouter {

    public router: Router;
    private sessionController: SessionController;
    private registrationController: RegistrationController;

    constructor() {
        this.router = Router();
        this.sessionController = new SessionController();
        this.registrationController = new RegistrationController();
        this.router.post("/session", [
            body("email", "Valid email address is required").isEmail(),
            body("password", "Password is required").not().isEmpty(),
            HandleErrors,
        ], async (req, res) => await this.sessionController.HandlePost(req, res));
        this.router.post("/registration", [
            body("email", "Valid email address is required").isEmail(),
            body("password", "Password is required").not().isEmpty(),
            body("password", "Password must have minimum of 4 characters").isLength({ min: 4 }),
            body("passwordCheck").custom((value, options) => {
                if (!options.req.body.password || value !== options.req.body.password) {
                    throw new Error("Passwords do not match");
                } else {
                    return value;
                }
            }),
            HandleErrors,
        ], async (req, res) => await this.registrationController.HandlePost(req, res));
    }
}

export default new UsersRouter().router;

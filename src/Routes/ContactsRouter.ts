import { Router } from "express";
import { body } from "express-validator/check";
import ContactsController from "../Controllers/ContactsController";
import AuthenticationMiddleware from "../Middleware/AuthenticationMiddleware";
import { HandleErrors } from "../Middleware/ValidationErrorsHandler";

class ContactsRouter {

    public router: Router;
    private contactsController: ContactsController;

    constructor() {
        this.router = Router();
        const authMiddleware = new AuthenticationMiddleware();
        this.router.use((req, res, next) => authMiddleware.Handle(req, res, next));
        this.contactsController = new ContactsController();
        this.router.post("/", [
            body("name").not().isEmpty(),
            body("email").optional().isEmail(),
            body("phone").optional().isMobilePhone("any"),
            HandleErrors,
        ], async (req, res) => await this.contactsController.HandlePost(req, res));
    }
}

export default new ContactsRouter().router;

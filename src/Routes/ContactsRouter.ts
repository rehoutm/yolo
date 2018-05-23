import { Router } from "express";
import AuthenticationMiddleware from "../Middleware/AuthenticationMiddleware";
//import ContactsController from "../Controllers/ContactsController";

class ContactsRouter {

    router: Router;
    //private contactsController: ContactsController;

    constructor() {
        this.router = Router();
        const authMiddleware = new AuthenticationMiddleware();
        this.router.use((req, res, next) => authMiddleware.Handle(req, res, next));
        //this.contactsController = new ContactsController();
        //this.router.post("/", async (req, res) => await this.contactsController.HandlePost(req, res));
    }
}

export default new ContactsRouter().router;
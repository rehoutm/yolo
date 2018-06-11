import * as bodyParser from "body-parser";
import * as express from "express";
import ContactsRouter from "./Routes/ContactsRouter";
import UsersRouter from "./Routes/UsersRouter";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use("/contacts", (req, res, next) => ContactsRouter(req, res, next));
        this.app.use("/users", (req, res, next) => UsersRouter(req, res, next));
    }

}

export default new App().app;

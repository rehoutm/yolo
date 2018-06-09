import * as express from "express";
import * as bodyParser from "body-parser";
import UsersRouter from "./Routes/UsersRouter";
import ContactsRouter from "./Routes/ContactsRouter";
import {initializeApp as fbInitiaizeApp, credential as fbCredential} from "firebase-admin";
import Settings from "./Settings";

class App {

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use("/contacts", (req, res, next) => ContactsRouter(req, res, next));
        this.app.use("/users", (req, res, next) => UsersRouter(req, res, next));
        fbInitiaizeApp({
            credential: fbCredential.cert(Settings.fbServiceAccount),
            databaseURL: Settings.fbUrl
        });
    }

    app: express.Application;
}

export default new App().app;

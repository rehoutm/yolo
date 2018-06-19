import * as bodyParser from "body-parser";
import * as express from "express";
import { getFirebase } from "./Firebase";
import User from "./Model/User";
import ContactsRouter from "./Routes/ContactsRouter";
import UsersRouter from "./Routes/UsersRouter";
import Settings from "./Settings";

class App {

    public static app: express.Application;

    public static async GetInstance(): Promise<express.Application> {
        App.app = App.app || await App.Init();
        return App.app;
    }

    private static async Init(): Promise<express.Application> {
        await this.InitConnections();
        const app = express();
        app.use(bodyParser.json());
        app.get("/", (req, res) => {
            res.send(`Welcome to Yolo API. See <a href="${Settings.documentationURL}">API Docs</a> first.`);
        });
        app.use("/contacts", (req, res, next) => ContactsRouter(req, res, next));
        app.use("/users", (req, res, next) => UsersRouter(req, res, next));
        return app;
    }

    private static async InitConnections(): Promise<void> {
        await User.Initialize();
        getFirebase();
    }
}

export default App.GetInstance;

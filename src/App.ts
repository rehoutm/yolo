import * as bodyParser from "body-parser";
import * as express from "express";
import ContactsRouter from "./Routes/ContactsRouter";
import UsersRouter from "./Routes/UsersRouter";

class App {

    public static app: express.Application;

    public static GetInstance(): express.Application {
        App.app = App.app || App.Init();
        return App.app;
    }
    private static Init(): express.Application {
        const app = express();
        app.use(bodyParser.json());
        app.use("/contacts", (req, res, next) => ContactsRouter(req, res, next));
        app.use("/users", (req, res, next) => UsersRouter(req, res, next));
        return app;
    }
}

export default App.GetInstance;

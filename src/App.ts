import * as express from "express";
import * as bodyParser from "body-parser";
import AuthenticationMiddleware from "./Middleware/AuthenticationMiddleware";
import UsersRouter from "./Routes/UsersRouter";

class App {

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());

        const securedRouter = express.Router();
        const authMiddleware = new AuthenticationMiddleware();
        securedRouter.use((req, res, next) => authMiddleware.Handle(req, res, next));
        securedRouter.get("/test",
            (req, res) => {
                res.send("Authenticated resource");
            });
        this.app.use("/secured", securedRouter);
        this.app.use("/users", (req, res, next) => UsersRouter(req, res, next))
    }

    app: express.Application;
}

export default new App().app;

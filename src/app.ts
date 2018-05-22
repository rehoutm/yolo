import * as express from "express";
import * as bodyParser from "body-parser";
import jwtAuthenticator from "./jwtAuthenticator";

class App {

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());

        const securedRouter = express.Router();
        securedRouter.use(new jwtAuthenticator().proceed);
        securedRouter.get("/test",
            (req, res) => {
                res.send("Authenticated resource");
            });
        this.app.use("/secured", securedRouter);
    }

    app: express.Application;
}

export default new App().app;

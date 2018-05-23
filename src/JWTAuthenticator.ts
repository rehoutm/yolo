import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default class JWTAuthenticator {

    private jwtSecret: string;

    constructor() {
        //TODO load from ENV
        this.jwtSecret = "123456";
    }

    proceed = (req: Request, res: Response, next: NextFunction) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        try {
            req.user = jwt.verify(token, this.jwtSecret);
            next();
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                res.status(401).send("Invalid token");
            } else if (e instanceof jwt.NotBeforeError) {
                res.status(401).send(`Token is not valid before ${e.date}`)
            } else if (e instanceof jwt.TokenExpiredError) {
                const date = new Date(e.expiredAt * 1000);
                res.status(401).send(`Token expired at ${date}`)
            } else {
                res.status(500).send("An error occured while authenticating the request.")
            }
        }
    }
}

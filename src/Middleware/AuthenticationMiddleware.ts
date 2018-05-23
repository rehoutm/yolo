import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import Settings from "../Settings";

export default class AuthenticationMiddleware {

    private jwtSecret: string;

    constructor() {
        this.jwtSecret = Settings.jwtSecret;
    }

    Handle (req: Request, res: Response, next: NextFunction) : void {
        const authHeader = <string>req.headers["authorization"];
        if (!authHeader) {
            res.status(401).send({ error: "Authorization header missing" });
            return;
        }
        const headerParts = authHeader.split(' ');
        if (headerParts.length != 2 || headerParts[0] !== "Bearer") {
            res.status(401).send({ error: "Authorization: Bearer expected" });
            return;
        }
        try {
            req.user = jwt.verify(headerParts[1], this.jwtSecret);
            next();
        } catch (e) {
            console.log(e);
            if (e instanceof jwt.JsonWebTokenError) {
                res.status(401).send({ error: "Invalid token" });
            } else if (e instanceof jwt.NotBeforeError) {
                res.status(401).send(`Token is not valid before ${e.date}`);
            } else if (e instanceof jwt.TokenExpiredError) {
                const date = new Date(e.expiredAt * 1000);
                res.status(401).send({ error: `Token expired at ${date}` });
            } else {
                res.status(500).send({ error: "An error occured while authenticating the request." });
            }
        }
    }
}

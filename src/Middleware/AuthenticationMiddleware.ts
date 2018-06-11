import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify as jwtVerify } from "jsonwebtoken";
import Settings from "../Settings";

export default class AuthenticationMiddleware {

    private jwtSecret: string;

    constructor(jwtSecret?: string) {
        this.jwtSecret = jwtSecret || Settings.jwtSecret;
    }

    public Handle(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers.authorization as string;
        if (!authHeader) {
            res.status(401).send({ error: "Authorization header missing" });
            return;
        }
        const headerParts = authHeader.split(" ");
        if (headerParts.length !== 2 || headerParts[0] !== "Bearer") {
            res.status(401).send({ error: "Authorization: Bearer expected" });
            return;
        }
        try {
            req.user = jwtVerify(headerParts[1], this.jwtSecret);
            next();
        } catch (e) {
            console.log(e);
            if (e instanceof JsonWebTokenError) {
                res.status(401).send({ error: "Invalid token" });
            } else if (e instanceof NotBeforeError) {
                res.status(401).send({ error: `Token is not valid before ${e.date}` });
            } else if (e instanceof TokenExpiredError) {
                const date = new Date(e.expiredAt * 1000);
                res.status(401).send({ error: `Token expired at ${date}` });
            } else {
                res.status(500).send({ error: "An error occured while authenticating the request." });
            }
        }
    }
}

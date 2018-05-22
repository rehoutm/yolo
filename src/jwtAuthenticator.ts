import * as express from "express";

export default class JwtAuthenticator {

    proceed = (req: express.Request, res: express.Response, next: Function) => {
        const token = req.header("x-access-token") || req.query.token;
        if (!token) {
            res.status(401).send("Access denied");
        }
        else
        {
        	next();
        }
    }
}

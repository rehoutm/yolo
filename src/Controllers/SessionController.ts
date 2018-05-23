import { Request, Response } from "express";
import User from "../Model/User";
import * as jwt from "jsonwebtoken";

export default class SessionController {

    private user: User;

    constructor() {
        this.user = new User();
    }

    async HandlePost(req: Request, res: Response) {
        if (this.user.Login(req.body.email, req.body.password)) {
            res.status(201).send({ token: await this.CreateToken(req.body.email) });
        } else {
            res.status(401).send("Invalid credentials");
        }
    }

    private CreateToken(email: string) : string  {
        //TODO load secret from ENV
        return jwt.sign({email: email}, "secret", {
            expiresIn: 3600
        });
    }
}

import { Request, Response } from "express";
import User from "../Model/User";
import * as jwt from "jsonwebtoken";
import Settings from "../Settings";

export default class SessionController {

    private user: User;
    private jwtSecret: string;

    constructor() {
        this.user = new User();
        this.jwtSecret = Settings.jwtSecret;
    }

    async HandlePost(req: Request, res: Response) {
        try {
            if (await this.user.Login(req.body.email, req.body.password)) {
                res.status(201).set("Authorization", `Bearer ${await this.CreateToken(req.body.email)}`).send();
            } else {
                res.status(401).send({ error: "Invalid credentials" });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({ error: "An error occured while logging in" });
        }
    }

    private CreateToken(email: string): string {
        return jwt.sign({ email: email }, this.jwtSecret, {
            expiresIn: 3600
        });
    }
}

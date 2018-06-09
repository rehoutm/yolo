import { Request, Response } from "express";
import { sign as jwtSign } from "jsonwebtoken";
import User from "../Model/User";
import Settings from "../Settings";
import Firebase from "../Firebase";

export default class SessionController {

    private jwtSecret: string;

    constructor() {
        this.jwtSecret = Settings.jwtSecret;
    }

    async HandlePost(req: Request, res: Response) {
        try {
            const userRecord = await User.Login(req.body.email, req.body.password);
            if (userRecord !== null) {
                res.status(201).set("Authorization", `Bearer ${await this.CreateToken(req.body.email, userRecord.uid)}`).send();
            } else {
                res.status(401).send({ error: "Invalid credentials" });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({ error: "An error occured while logging in" });
        }
    }

    private async CreateToken(email: string, userUid: string): Promise<string> {
        const fbToken = await Firebase.auth().createCustomToken(userUid);
        return jwtSign({ email: email, uid: userUid, fbToken: fbToken }, this.jwtSecret, {
            expiresIn: 3600
        });
    }
}

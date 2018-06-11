import { Request, Response } from "express";
import { sign as jwtSign } from "jsonwebtoken";
import Firebase from "../Firebase";
import User from "../Model/User";
import Settings from "../Settings";

export default class SessionController {

    private jwtSecret: string;

    constructor() {
        this.jwtSecret = Settings.jwtSecret;
    }

    public async HandlePost(req: Request, res: Response) {
        try {
            const userRecord = await User.Login(req.body.email, req.body.password);
            if (userRecord !== null) {
                const token = `Bearer ${await this.CreateToken(req.body.email, userRecord.uid)}`;
                // tslint:disable-next-line:max-line-length
                res.status(201).set("Authorization", token).send({ message: "Session created, use JWT provided in Authorization header for authenticated requests." });
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
        return jwtSign({ email, uid: userUid, fbToken }, this.jwtSecret, {
            expiresIn: 3600,
        });
    }
}

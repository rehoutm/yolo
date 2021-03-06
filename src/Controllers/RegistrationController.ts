import { Request, Response } from "express";
import { MongoError } from "mongodb";
import User from "../Model/User";

export default class RegistrationController {

    public async HandlePost(req: Request, res: Response) {
        try {
            await User.Add(req.body.email, req.body.password);
            res.status(201).send({ message: "Account created, session can be created now" });
        } catch (e) {
            if (e instanceof MongoError && e.code === 11000) {
                res.status(409).send({ error: "An account with given email already exists" });
            } else {
                console.log(e);
                res.status(500).send({ error: "An error occured while creating the account" });
            }
        }
    }
}

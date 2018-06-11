import { Request, Response } from "express";
import { AddressBook, IContact } from "../Model/AddressBook";

export default class ContactsController {

    public async HandlePost(req: Request, res: Response) {
        try {
            const createdKey = await (new AddressBook()).AddContact(req.user.uid, req.body as IContact);
            res.status(201).send({ message: "Contact created", key: createdKey });
        } catch (e) {
            console.log(e);
            res.status(500).send({ error: "An error occured while saving the contact" });
        }
    }
}

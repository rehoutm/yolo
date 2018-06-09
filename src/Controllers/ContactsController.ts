import { Request, Response } from "express";
import AddressBook, { Contact } from "../Model/AddressBook";

export default class ContactsController {

    async HandlePost(req: Request, res: Response) {
        try {
            const createdKey = await AddressBook.AddContact(req.user.uid, req.body as Contact);
            res.status(201).send({ message: "Contact created", key: createdKey });
        } catch (e) {
            console.log(e);
            res.status(500).send({ error: "An error occured while saving the contact" });
        }
    }
}

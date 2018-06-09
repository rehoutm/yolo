import { database as fbDatabase } from "firebase-admin";

export type Contact = {
    name: string,
    email: string,
    phone: string
}

class AddressBook {

    private database: fbDatabase.Database;

    constructor () {
        this.database = fbDatabase();
    }

    async AddContact(addressBookUid: string, contact: Contact) : Promise<string> {
        const collectionRef = this.database.ref(`addressBooks/${addressBookUid}`);
        var newContactRef = await collectionRef.push(contact);
        return newContactRef.key;
    }
}

export default new AddressBook();

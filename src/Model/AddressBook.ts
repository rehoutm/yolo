import { firestore } from "firebase-admin";
import Firebase from "../Firebase";

export interface IContact {
    name: string;
    email: string;
    phone: string;
}

class AddressBook {

    public firestore: firestore.Firestore;

    constructor() {
        this.firestore = Firebase.firestore();
    }

    public async AddContact(addressBookUid: string, contact: IContact): Promise<string> {
        const collectionRef = this.firestore.collection("addressBooks").doc(addressBookUid).collection("contacts");
        const newContactRef = await collectionRef.add(contact);
        return newContactRef.id;
    }
}

export default new AddressBook();

import { firestore } from "firebase-admin";
import { getFirebase } from "../Firebase";

export interface IContact {
    name: string;
    email: string;
    phone: string;
}

export class AddressBook {

    public firestore: firestore.Firestore;

    constructor() {
        this.firestore = getFirebase().firestore();
    }

    public async AddContact(addressBookUid: string, contact: IContact): Promise<string> {
        const collectionRef = this.firestore.collection("addressBooks").doc(addressBookUid).collection("contacts");
        const newContactRef = await collectionRef.add(contact);
        return newContactRef.id;
    }
}

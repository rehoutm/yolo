import Firebase from "../Firebase";
import { firestore } from "firebase-admin";

export type Contact = {
    name: string,
    email: string,
    phone: string
}

class AddressBook {

    firestore: firestore.Firestore;

    constructor () {
        this.firestore = Firebase.firestore();
    }

    async AddContact(addressBookUid: string, contact: Contact) : Promise<string> {
        const collectionRef = this.firestore.collection("addressBooks").doc(addressBookUid).collection("contacts");
        var newContactRef = await collectionRef.add(contact);
        return newContactRef.id;
    }
}

export default new AddressBook();

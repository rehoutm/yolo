import { app, apps, credential, initializeApp } from "firebase-admin";
import Settings from "./Settings";

export function getFirebase() {
    return !apps.length ? initializeApp({
        credential: credential.cert(Settings.fbServiceAccount),
        databaseURL: Settings.fbUrl,
    }) : app();
}

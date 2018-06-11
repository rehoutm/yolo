import { app , apps, credential, initializeApp } from "firebase-admin";
import Settings from "./Settings";

export default !apps.length ? initializeApp({
    credential: credential.cert(Settings.fbServiceAccount),
    databaseURL: Settings.fbUrl,
}) : app();

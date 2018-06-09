import { app as fbApp, apps as fbApps, initializeApp as fbInitializeApp, credential as fbCredential } from "firebase-admin";
import Settings from "./Settings";

export default !fbApps.length ? fbInitializeApp({
    credential: fbCredential.cert(Settings.fbServiceAccount),
    databaseURL: Settings.fbUrl
}) : fbApp();
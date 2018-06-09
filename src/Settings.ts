import { ServiceAccount as FBServiceAccount } from "firebase-admin";

class Settings {
    constructor() {
        //TODO load from env
        this.jwtSecret = "jwtVerySecretKey";
        this.passwordPepper = "pwdSecretPepper";
        this.userDatabaseFile = "memory";
        this.fbServiceAccount = require ("../keys/yo-yolo-firebase.json");
        this.fbUrl = "https://yo-yolo.firebaseio.com";
    }

    jwtSecret: string;
    passwordPepper: string;
    userDatabaseFile: string;
    fbServiceAccount: FBServiceAccount;
    fbUrl: string;
}
export default new Settings();
import { ServiceAccount as FBServiceAccount } from "firebase-admin";

class Settings {
    constructor() {
        //TODO load from env
        this.jwtSecret = "jwtVerySecretKey";
        this.passwordPepper = "pwdSecretPepper";
        this.userDatabaseFile = "memory";
        this.fbServiceAccount = require ("../keys/yo-yolo-firebase.json");
    }

    jwtSecret: string;
    passwordPepper: string;
    userDatabaseFile: string;
    fbServiceAccount: FBServiceAccount;
}
export default new Settings();
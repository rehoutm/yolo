import { ServiceAccount as FBServiceAccount } from "firebase-admin";
import { load as dotEnvLoad } from "dotenv";

class Settings {
    constructor() {
        if (process.env["NODE_ENV"] !== "production") {
            dotEnvLoad();
        }
        this.jwtSecret = process.env["JWT_SECRET"];
        this.passwordPepper = process.env["PWD_PEPPER"];
        this.userDatabaseFile = process.env["DB_FILE"];
        this.fbServiceAccount = JSON.parse(Buffer.from(process.env["FB_ACC"], 'base64').toString());
        this.fbUrl = process.env["FB_URL"];
        this.processPort = Number(process.env["PORT"]);
    }

    jwtSecret: string;
    passwordPepper: string;
    userDatabaseFile: string;
    fbServiceAccount: FBServiceAccount;
    fbUrl: string;
    processPort: number;
}
export default new Settings();
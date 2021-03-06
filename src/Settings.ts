import { load as dotEnvLoad } from "dotenv";
import { ServiceAccount as FBServiceAccount } from "firebase-admin";

class Settings {

    public static getInstance(): Settings {
        Settings.instance = Settings.instance || new Settings();
        return Settings.instance;
    }

    private static instance: Settings;

    public jwtSecret: string;
    public passwordPepper: string;
    public mongoUrl: string;
    public mongoDbName: string;
    public fbServiceAccount: FBServiceAccount;
    public fbUrl: string;
    public processPort: number;
    public documentationURL: string;

    private constructor() {
    }

    public InitializeFromEnv(): void {
        /* tslint:disable:no-string-literal */
        if (process.env["NODE_ENV"] !== "production") {
            dotEnvLoad();
        }
        this.jwtSecret = process.env["JWT_SECRET"];
        this.passwordPepper = process.env["PWD_PEPPER"];
        this.mongoUrl = process.env["MONGO_URL"];
        this.mongoDbName = process.env["MONGO_DB_NAME"];
        try {
            this.fbServiceAccount = JSON.parse(Buffer.from(process.env["FB_ACC"], "base64").toString());
        } catch (err) {
            console.log(err);
            throw new Error("Invalid format of FB_ACC env variable - failed to load firebase service account object");
        }
        this.fbUrl = process.env["FB_URL"];
        this.processPort = Number(process.env["PORT"]);
        this.documentationURL = process.env["DOCS_URL"];
        /* tslint:enable:no-string-literal */
    }
}

export default Settings.getInstance();

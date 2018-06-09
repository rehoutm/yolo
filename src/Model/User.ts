import Password from "./Password";
import * as Datastore from "nedb";
import Settings from "../Settings";
import { promisify } from "util";
import * as uuid from "uuid/v4";

type UserRecord = {
    email: string;
    passwordHash: string;
}

class User {

    private database: Nedb;
    private initialized: boolean;
    private password: Password;

    constructor() {
        this.password = new Password();
        //persisted DB is not working on WSL...
        if (Settings.userDatabaseFile == "memory") {
            this.database = new Datastore();
        } else {
            this.database = new Datastore({ filename: Settings.userDatabaseFile });
        }
    }

    private async Initialize(): Promise<void> {
        if (this.initialized) {
            return;
        }
        await promisify(this.database.loadDatabase).bind(this.database);
        await promisify(this.database.ensureIndex).bind(this.database)({ fieldName: "email", unique: true });
        this.initialized = true;
    }

    async Add(email: string, password: string): Promise<void> {
        await this.Initialize();
        const passwordHash = await this.password.GenerateHash(password);
        await promisify<UserRecord, UserRecord>(this.database.insert).bind(this.database)({
            email: email,
            passwordHash: passwordHash,
            uid: uuid()
        });
    }

    async CheckPassword(email: string, password: string): Promise<boolean> {
        if (!email || !password) {
            return false;
        }
        const storedHash = await this.ReadPasswordHash(email);
        if (storedHash === null) {
            return false;
        }
        return await this.password.Verify(password, storedHash);
    }

    private async ReadPasswordHash(email: string): Promise<string> {
        await this.Initialize();
        const user = await promisify(this.ReadPasswordHashInternal).bind(this)(email);
        return user === null ? null : user.passwordHash;
    }

    //little hack to work around promisify not able to infere the right overload
    private ReadPasswordHashInternal(email: string, callback: (err: Error, document: UserRecord) => void): void {
        this.database.findOne<UserRecord>({ email: email }, callback);
    }
}

export default new User();

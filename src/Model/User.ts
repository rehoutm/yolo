import Password from "./Password";
import * as Datastore from "nedb";
import Settings from "../Settings";
import { promisify } from "util";
import * as uuid from "uuid/v4";

type UserRecord = {
    email: string;
    passwordHash: string;
    uid: string;
}

class User {

    private database: Nedb;
    private initialized: boolean;

    constructor() {

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
        const passwordHash = await Password.GenerateHash(password);
        await promisify<UserRecord, UserRecord>(this.database.insert).bind(this.database)({
            email: email,
            passwordHash: passwordHash,
            uid: uuid()
        });
    }

    async Login(email: string, password: string): Promise<UserRecord> {
        if (!email || !password) {
            return null;
        }
        const userRecord = await this.GetUserRecord(email);
        if (userRecord === null) {
            return null;
        }
        if (await Password.Verify(password, userRecord.passwordHash)) {
            return userRecord;
        }
        return null;
    }

    private async GetUserRecord(email: string): Promise<UserRecord> {
        await this.Initialize();
        const user = await promisify(this.GetUserRecordInternal).bind(this)(email);
        return user === null ? null : user;
    }

    //little hack to work around promisify not able to infere the right overload
    private GetUserRecordInternal(email: string, callback: (err: Error, document: UserRecord) => void): void {
        this.database.findOne<UserRecord>({ email: email }, callback);
    }
}

export default new User();

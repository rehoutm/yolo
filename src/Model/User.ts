import Password from "./Password";
import Settings from "../Settings";
import { promisify } from "util";
import * as uuid from "uuid/v4";
import { Db as MongoDb, MongoClient, Collection } from "mongodb";

type UserRecord = {
    email: string;
    passwordHash: string;
    uid: string;
}

class User {

    private database: MongoDb;
    private initialized: boolean;
    private usersCollection: Collection<UserRecord>;

    private async Initialize(): Promise<void> {
        if (this.initialized) {
            return;
        }
        this.database = (await MongoClient.connect(Settings.mongoUrl)).db(Settings.mongoDbName);
        this.usersCollection = this.database.collection<UserRecord>("users");
        await this.usersCollection.createIndex("email", { unique: true });
        this.initialized = true;
    }

    async Add(email: string, password: string): Promise<void> {
        await this.Initialize();
        const passwordHash = await Password.GenerateHash(password);
        await this.usersCollection.insertOne({
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
        const user = await this.usersCollection.findOne({ email: email });
        return user === null ? null : user;
    }
}

export default new User();

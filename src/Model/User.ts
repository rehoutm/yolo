import * as AsyncLock from "async-lock";
import { Collection, Db as MongoDb, MongoClient } from "mongodb";
import { promisify } from "util";
import * as uuid from "uuid/v4";
import Settings from "../Settings";
import { Password } from "./Password";

interface IUserRecord {
    email: string;
    passwordHash: string;
    uid: string;
}

class User {

    private static readonly lockKey = "user_init_lock";
    private database: MongoDb;
    private initialized: boolean;
    private usersCollection: Collection<IUserRecord>;
    private password: Password;
    private initLock: AsyncLock;

    constructor() {
        this.password = new Password(Settings.passwordPepper);
        this.initLock = new AsyncLock();
    }

    public async Add(email: string, password: string): Promise<void> {
        const passwordHash = await this.password.GenerateHash(password);
        await this.usersCollection.insertOne({
            email,
            passwordHash,
            uid: uuid(),
        });
    }

    public async Login(email: string, password: string): Promise<IUserRecord> {
        if (!email || !password) {
            return null;
        }
        const userRecord = await this.GetUserRecord(email);
        if (userRecord === null) {
            return null;
        }
        if (await this.password.Verify(password, userRecord.passwordHash)) {
            return userRecord;
        }
        return null;
    }

    public async Initialize(): Promise<void> {
        if (this.initialized) {
            return;
        }
        await this.initLock.acquire(User.lockKey, async () => {
            // double-checked locking
            if (this.initialized) {
                return;
            }
            this.database = (await MongoClient.connect(Settings.mongoUrl)).db(Settings.mongoDbName);
            this.usersCollection = this.database.collection<IUserRecord>("users");
            await this.usersCollection.createIndex("email", { unique: true });
            this.initialized = true;
        });
    }

    private async GetUserRecord(email: string): Promise<IUserRecord> {
        const user = await this.usersCollection.findOne({ email });
        return user === null ? null : user;
    }
}

export default new User();

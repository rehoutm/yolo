import * as argon2 from "argon2";
import Settings from "../Settings";

export default class Password {

    private pepper: string;

    constructor() {
        this.pepper = Settings.passwordPepper;
    }

    async Verify(password: string, hash: string): Promise<boolean> {
        const seasonedPwd = this.GetSeasoned(password);
        console.log(seasonedPwd);
        console.log(hash);
        return await argon2.verify(hash, seasonedPwd);
    }

    async GenerateHash(password: string): Promise<string> {
        const seasonedPwd = this.GetSeasoned(password);
        console.log(seasonedPwd);
        return await argon2.hash(seasonedPwd);
    }

    private GetSeasoned(password: string): string {
        return password + this.pepper;
    }
}

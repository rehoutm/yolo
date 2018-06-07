import { verify as argonVerify, hash as argonHash } from "argon2";
import Settings from "../Settings";

export default class Password {

    private pepper: string;

    constructor() {
        this.pepper = Settings.passwordPepper;
    }

    async Verify(password: string, hash: string): Promise<boolean> {
        const seasonedPwd = this.GetSeasoned(password);
        return await argonVerify(hash, seasonedPwd);
    }

    async GenerateHash(password: string): Promise<string> {
        const seasonedPwd = this.GetSeasoned(password);
        return await argonHash(seasonedPwd);
    }

    private GetSeasoned(password: string): string {
        return password + this.pepper;
    }
}

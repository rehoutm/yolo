import { hash as argonHash, verify as argonVerify } from "argon2";
import Settings from "../Settings";

class Password {

    private pepper: string;

    constructor() {
        this.pepper = Settings.passwordPepper;
    }

    public async Verify(password: string, hash: string): Promise<boolean> {
        const seasonedPwd = this.GetSeasoned(password);
        return await argonVerify(hash, seasonedPwd);
    }

    public async GenerateHash(password: string): Promise<string> {
        const seasonedPwd = this.GetSeasoned(password);
        return await argonHash(seasonedPwd);
    }

    private GetSeasoned(password: string): string {
        return password + this.pepper;
    }
}

export default new Password();

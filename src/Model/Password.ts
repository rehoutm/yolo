import { hash as argonHash, verify as argonVerify } from "argon2";

export class Password {

    private pepper: string;

    constructor(passwordPepper: string) {
        this.pepper = passwordPepper;
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

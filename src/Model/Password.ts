import argon2 from "argon2";

export default class Password {

    private pepper: string;

    constructor() {
        //TODO - get pepper from ENV
        this.pepper = "123456";
    }

    async Verify(password: string, hash: string) : Promise<boolean> {
        return await argon2.verify(hash, this.GetSeasoned(password));
    }

    async GenerateHash(password: string) : Promise<string> {
        return await argon2.hash(this.GetSeasoned(password));
    }

    private GetSeasoned(password: string) : string {
        return password + this.pepper;
    }
}


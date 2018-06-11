import { expect } from "chai";
import { Password } from "../src/Model/Password";

describe("PasswordVerification", () => {
    it("Password generated hash should verify against the original password", async () => {
        const password = new Password("12345");
        const input = "testPass";
        const hash = await password.GenerateHash(input);
        expect(await password.Verify(input, hash)).to.equal(true);
    });
});

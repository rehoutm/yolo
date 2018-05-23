import Password from "./Password";

export default class User {

    async Add(email: string, password: string) : Promise<void> {
    }

    async Login(email: string, passwordInput: string) : Promise<boolean> {
        const storedHash = await this.ReadPasswordHash(email);
        if (storedHash === null) {
            return false;
        }
        const password = new Password();
        return await password.Verify(passwordInput, storedHash);
    }

    private async ReadPasswordHash(email: string) : Promise<string> {
        //TODO login against adatabase
        const password = new Password();
        return email === "test@yolo.app" ? Promise.resolve(password.GenerateHash("test")) : null;
    }
}
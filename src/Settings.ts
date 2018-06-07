class Settings {
    constructor() {
        //TODO load from env
        this.jwtSecret = "jwtVerySecretKey";
        this.passwordPepper = "pwdSecretPepper";
        this.userDatabaseFile = "memory";
    }

    jwtSecret: string;
    passwordPepper: string;
    userDatabaseFile: string;
}
export default new Settings();
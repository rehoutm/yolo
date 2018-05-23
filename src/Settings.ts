class Settings {
    constructor() {
        //TODO load from env
        this.jwtSecret = "jwtVerySecretKey";
        this.passwordPepper = "pwdSecretPepper";
    }

    jwtSecret: string;
    passwordPepper: string;
}
export default new Settings();
import { Application } from "express";
import Settings from "./Settings";
Settings.InitializeFromEnv();
// settings must be initialized before anything else

import appInit from "./App";
const appPromise: Promise<Application> = appInit();
appPromise.then((app) => {
    app.listen(Settings.processPort, () => {
        console.log(`Express server listening on port ${Settings.processPort}`);
    });
}).catch((err) => {
    console.log(err);
});

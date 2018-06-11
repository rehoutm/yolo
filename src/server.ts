import Settings from "./Settings";
Settings.InitializeFromEnv();
// settings must be initialized before anything else

import appInit from "./App";
const app = appInit();
app.listen(Settings.processPort, () => {
    console.log(`Express server listening on port ${Settings.processPort}`);
});

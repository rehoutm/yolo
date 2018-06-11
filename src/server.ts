import app from "./App";
import Settings from "./Settings";
Settings.InitializeFromEnv();
const port = Settings.processPort;
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

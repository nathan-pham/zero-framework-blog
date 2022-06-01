import ZeroServer from "./lib/ZeroServer";
import config from "./config";

// import services
import servePublic from "./services/servePublic";
import serveApp from "./services/serveApp";

new ZeroServer({
    port: config.port,
    services: [servePublic, serveApp],
});

import ZeroServer from "./lib/ZeroServer";
import config from "./config";

// import services
import servePublic from "./services/servePublic";

new ZeroServer({
    port: config.port,
    services: [servePublic],
});

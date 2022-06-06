import ZeroServer from "./lib/ZeroServer";
import config from "./config";

// import services
import servePublic from "./services/servePublic";
import serveApp from "./services/serveApp";

new ZeroServer({
    port: config.port,
    services: [servePublic, serveApp],
});

/*
TODO:
z-code syntax highlighter
z-comment section

template intro (only for Zero)
- create template (archive -> completely vanilla)
- create template (main -> with Zero framework)
*/

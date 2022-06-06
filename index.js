import ZeroServer from "./lib/ZeroServer";
import config from "./config";

// import services
import servePublic from "./services/servePublic";
import serveApp from "./services/serveApp";

/*
create a new server
relies on a simple principle: you have a bunch of "services"
services return "true" if they send a response and will prevent other services from running

unfortunately, my implementation of ZeroServer & the Zero frontend does not yet support errors, like a 404 page
(although ZeroServerUtils support these responses)
*/
new ZeroServer({
    port: config.port,
    services: [servePublic, serveApp],
});

/*
TODO:
z-comment section
comment everything

template intro (only for Zero)
- create template (main -> with Zero framework)
*/

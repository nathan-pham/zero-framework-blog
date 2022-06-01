import ZeroServer from "./lib/ZeroServer";
import config from "./config";

new ZeroServer({
    port: config.port,
    services: [
        (utils) => {
            utils.res.end("pk");
        },
    ],
});

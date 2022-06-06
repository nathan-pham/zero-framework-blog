import { createServer } from "http";
import ZeroServerUtils from "./ZeroServerUtils";

export default class ZeroServer {
    constructor({ port = 5500, services = [] } = {}) {
        this.port = port;
        this.services = services;

        this.server = this._createServer();
        this.server.listen(this.port);
    }

    // create actual server
    // as you can see, very simple
    _createServer() {
        const server = createServer((req, res) => {
            const utils = new ZeroServerUtils(this, req, res);

            for (const service of this.services) {
                if (service(utils)) {
                    return;
                }
            }

            utils.error(404, "not found");
        });

        return server;
    }
}

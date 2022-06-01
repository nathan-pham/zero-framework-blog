import { createServer } from "http";

const defaultConfig = {
    port: 5500,
    services: [],
};

export default class ZeroServer {
    constructor({ port, services } = defaultConfig) {
        this.port = port;
        this.services = services;

        this.server = this._createServer();
        this.server.listen(this.port);
    }

    _createUtils(req, res) {
        const pathname = new URL(`http://localhost:${this.port}${req.url}`);

        return {
            req,
            res,

            pathname,
        };
    }

    _createServer() {
        const server = createServer((req, res) => {
            const utils = this._createUtils(req, res);

            for (const service of this.services) {
                if (service(utils)) {
                    return;
                }
            }
        });

        return server;
    }
}

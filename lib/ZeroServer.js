import { createServer } from "http";
import { resolve } from "path";

import { __dirname } from "../config";

import ZeroRenderer from "./ZeroRenderer";

class Utils {
    constructor(server, req, res) {
        this.server = server;
        this.req = req;
        this.res = res;

        this.url = new URL(`http://localhost:${this.server.port}${req.url}`);
    }

    status(code) {
        this.res.statusCode = code;
        return this;
    }

    header(key, value) {
        this.res.setHeader(key, value);
        return this;
    }

    send(message) {
        this.status(200)
            .header("Content-Type", Utils.getContentType(".txt"))
            .end(message, "utf-8");
    }

    sendFile(filename) {
        this.status(200)
            .header("Content-Type", Utils.getContentType(pathname))
            .end(Utils.readFile(filename), "utf-8");
    }

    renderFile(filename, data) {
        const renderer = new ZeroRenderer(Utils.readFile(filename), data);

        this.status(200)
            .header("Content-Type", Utils.getContentType(pathname))
            .end(renderer.compile(), "utf-8");
    }

    // get mime from filename
    static getContentType(filename) {
        const extentionToType = {
            ".txt": "text/plain",
            ".html": "text/html",
            ".js": "text/javascript",
            ".css": "text/css",
            ".json": "application/json",
            ".png": "image/png",
            ".jpg": "image/jpg",
            ".gif": "image/gif",
            ".svg": "image/svg+xml",
            ".wav": "audio/wav",
            ".mp4": "video/mp4",
            ".woff": "application/font-woff",
            ".ttf": "application/font-ttf",
            ".eot": "application/vnd.ms-fontobject",
            ".otf": "application/font-otf",
            ".wasm": "application/wasm",
        };

        for (const [extension, type] of Object.entries(extentionToType)) {
            if (filename.endsWith(extension)) {
                return type;
            }
        }

        return extentionToType[".txt"];
    }

    // memoized readFile
    static readFileCache = {};
    static readFile(filename) {
        filename = resolve(__dirname, filename);

        if (Utils.readFileCache.hasOwnProperty(filename)) {
            return Utils.readFileCache[filename];
        }

        try {
            const fileContent = fs.readFileSync(filename, "utf-8");
            Utils.readFileCache[filename] = fileContent;
            return fileContent;
        } catch (e) {
            return e;
        }
    }
}

export default class ZeroServer {
    constructor({ port = 5500, services = [] } = {}) {
        this.port = port;
        this.services = services;

        this.server = this._createServer();
        this.server.listen(this.port);
    }

    // create actual server
    _createServer() {
        const server = createServer((req, res) => {
            const utils = new Utils(this, req, res);

            for (const service of this.services) {
                if (service(utils)) {
                    return;
                }
            }
        });

        return server;
    }
}

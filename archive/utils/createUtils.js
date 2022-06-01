import getContentType from "./getContentType.js";
import readFile from "./readFile.js";

import TemplatingEngine from "../lib/TemplatingEngine.js";
import config from "../config.js";

const createUtils = (req, res) => {
    return {
        req,
        res,

        url: new URL(`http://localhost:${config.port}${req.url}`),
        status(code) {
            res.statusCode = code;
        },
        error(code, message) {
            res.statusCode = code;
            res.setHeader("Content-Type", getContentType(".txt"));
            res.end(`[error] ${code} ${message}`, "utf-8");
        },
        sendFile(pathname, data = {}) {
            res.statusCode = 200;
            res.setHeader("Content-Type", getContentType(pathname));

            const engine = new TemplatingEngine(readFile(pathname), data);
            res.end(engine.compile(), "utf-8");
        },
    };
};

export default createUtils;

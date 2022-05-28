import getContentType from "./getContentType.js";
import readFile from "./readFile.js";

import TemplatingEngine from "../lib/TemplatingEngine.js";

const createUtils = (req, res) => {
    const pathname = req.url.substring(1);

    return {
        req,
        res,

        pathname,
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

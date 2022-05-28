import { createServer } from "http";

import createUtils from "./utils/createUtils.js";
import servePublic from "./public/servePublic.js";
import servePosts from "./posts/servePosts.js";

const apis = [servePublic, servePosts];

createServer((req, res) => {
    const utils = createUtils(req, res);
    for (const api of apis) {
        if (api(utils)) return;
    }

    utils.error(404, "not found");
}).listen(8080);

/*
TODO:
3. replit auth to update/edit posts
4. comments
5. editor with notion-like-stuff
*/

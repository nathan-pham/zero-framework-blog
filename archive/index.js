import { createServer } from "http";

import createUtils from "./utils/createUtils.js";
import servePublic from "./endpoints/servePublic.js";
import servePosts from "./endpoints/servePosts.js";

import serveSearch from "./endpoints/serveSearch.js";

import config from "./config.js";

const apis = [servePublic, servePosts, serveSearch];

createServer((req, res) => {
    const utils = createUtils(req, res);
    for (const api of apis) {
        if (api(utils)) return;
    }

    utils.error(404, "not found");
}).listen(config.port);

/*
TODO:
- replit auth to update/edit posts
    - tweet & like stuff
    - comments

- only template with landing page opening + tutorial

- meta tags for images
- syntax highlighting
- search + tags

- spa functionality
- tooltips
- animations

- responsive design
*/

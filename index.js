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
- replit auth to update/edit posts
    - tweet & like stuff
    - comments

- editor with notion-like-stuff
- only template with landing page opening
- meta tags for images
- syntax highlighting
- search + tags

- spa functionality
- tooltips
- animations

- responsive design
*/

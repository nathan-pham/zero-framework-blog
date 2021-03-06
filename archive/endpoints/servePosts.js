import getAllFiles from "../utils/getAllFiles.js";
import readFile from "../utils/readFile.js";
import Markdown from "../lib/Markdown.js";

import config from "../config.js";

const postFiles = getAllFiles("./posts")
    .filter((path) => !path.endsWith("servePosts.js"))
    .map((url) => {
        const raw = readFile(url);
        const markdown = new Markdown(raw);

        return {
            url: "/" + url.replace(".md", ""),
            content: markdown.render(),
            metadata: markdown.metadata,
            tokens: markdown.tokens,
        };
    });

const servePosts = ({ req, sendFile, url }) => {
    const post = postFiles.find((post) => post.url === url.pathname);

    if (req.method === "GET") {
        if (post) {
            sendFile("./templates/post.html", {
                post,
                config,
            });

            return true;
        } else if (url.pathname === "/") {
            sendFile("./templates/index.html", {
                posts: postFiles,
                config,
            });

            return true;
        }
    }
};

export default servePosts;
export { postFiles };

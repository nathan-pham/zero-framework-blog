import getAllFiles from "../utils/getAllFiles.js";
import readFile from "../utils/readFile.js";
import Markdown from "../lib/Markdown.js";

const postFiles = getAllFiles("./posts")
    .filter((path) => !path.endsWith("servePosts.js"))
    .map((url) => {
        const raw = readFile(url);
        const markdown = new Markdown(raw);

        return {
            url: url.replace(".md", ""),
            content: markdown.render(),
            metadata: markdown.metadata,
            tokens: markdown.tokens,
        };
    });

const servePosts = ({ req, sendFile, pathname }) => {
    const post = postFiles.find(({ url }) => url === pathname);

    if (req.method === "GET") {
        if (post) {
            sendFile("./templates/post.html", {
                post,
            });

            return true;
        } else if (pathname === "") {
            sendFile("./templates/index.html", {
                posts: postFiles,
            });

            return true;
        }
    }

    return false;
};

export default servePosts;

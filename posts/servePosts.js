import getAllFiles from "../utils/getAllFiles.js";
import readFile from "../utils/readFile.js";
import Markdown from "../lib/Markdown.js";

const postFiles = getAllFiles("./posts")
    .filter((path) => !path.endsWith("servePosts.js"))
    .map((url) => {
        const markdown = new Markdown(readFile(url));

        return {
            url: url.replace(".md", ""),
            content: markdown.render(),
            metadata: markdown.metadata,
        };
    });

const servePosts = ({ req, sendFile, pathname }) => {
    const post = postFiles.find(({ url }) => url === pathname);

    if (req.method === "GET") {
        if (post) {
            sendFile("./templates/post.html", {
                content: post.content,
            });

            return true;
        } else if (pathname === "") {
            sendFile("./templates/index.html", {
                posts: postFiles.map((post) => post.metadata),
            });

            return true;
        }
    }

    return false;
};

export default servePosts;

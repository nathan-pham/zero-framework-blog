import ZeroServerUtils from "../lib/ZeroServerUtils";
import ZeroMarkdown from "../lib/ZeroMarkdown";
import config from "../config";

const postsDirectory = "posts";
const postFiles = ZeroServerUtils.getAllFiles(postsDirectory).map(
    (filename) => {
        const zeroMarkdown = new ZeroMarkdown(
            ZeroServerUtils.readFile(filename)
        );

        return {
            url: filename.replace(".md", ""),
            markdown: zeroMarkdown,
            content: zeroMarkdown.render(),
        };
    }
);

export default (utils) => {
    if (utils.req.method === "GET") {
        utils.renderFile("templates/index.html", {
            author: config.author,
            posts: postFiles,
        });

        return true;
    }
};

// return {
//     content: markdown.render(),
//     metadata: markdown.metadata,
//     tokens: markdown.tokens,
// };
//     return {
//         url: "/" + url.replace(".md", ""),
//         content: markdown.render(),
//         metadata: markdown.metadata,
//         tokens: markdown.tokens,
//     };

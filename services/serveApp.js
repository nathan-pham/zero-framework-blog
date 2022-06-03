import config from "../config";

export default (utils) => {
    if (utils.req.method === "GET") {
        utils.renderFile("templates/index.html", { author: config.author });
        return true;
    }
};

export default (utils) => {
    if (utils.req.method === "GET") {
        utils.renderFile("templates/index.html");
        return true;
    }
};

import getAllFiles from "../utils/getAllFiles.js";

const publicFiles = getAllFiles("./public")
    .filter((path) => !path.endsWith("servePublic.js"))
    .map((path) => "/" + path);

const servePublic = ({ req, sendFile, url }) => {
    if (req.method === "GET" && publicFiles.includes(url.pathname)) {
        sendFile(url.pathname.substring(1));
        return true;
    }
};

export default servePublic;

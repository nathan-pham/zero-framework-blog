import getAllFiles from "../utils/getAllFiles.js";

const publicFiles = getAllFiles("./public").filter(
    (path) => !path.endsWith("servePublic.js")
);

const servePublic = ({ req, sendFile, pathname }) => {
    if (req.method === "GET" && publicFiles.includes(pathname)) {
        sendFile(pathname);
        return true;
    }

    return false;
};

export default servePublic;

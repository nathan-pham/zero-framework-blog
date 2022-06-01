import { postFiles } from "./servePosts.js"

const serveSearch = ({ req, sendFile, url }) => {
    if (req.method === "GET" && url.pathname === "/search") {
        sendFile("templates/search.html", { posts: postFiles });
        return true;
    }
};

export default serveSearch;
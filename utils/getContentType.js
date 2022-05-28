const extentionToType = {
    ".txt": "text/plain",
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
}

const getContentType = (filename) => {
    for(const [extension, type] of Object.entries(extentionToType)) {
        if(filename.endsWith(extension)) {
            return type
        }
    }

    return extentionToType[".txt"]
}

export default getContentType
import getContentType from "./getContentType.js"
import readFile from "./readFile.js"

const createUtils = (req, res) => {
    const pathname = req.url.substring(1)

    return {
        req,
        res,

        pathname,
        status(code) {
            res.statusCode = code
        },
        error(code, message) {
            res.statusCode = code
            res.setHeader("Content-Type", getContentType(".txt"))
            res.end(`[error] ${code} ${message}`, "utf-8")  
        },
        sendFile(pathname, data={}) {
            res.statusCode = 200
            res.setHeader("Content-Type", getContentType(pathname))

            // very basic template "rendering" system
            let fileContents = readFile(pathname)
            for(const [key, value] of Object.entries(data)) {
                fileContents = fileContents.replace(
                    new RegExp(`{{${key}}}`, 'g'),
                    value
                )
            }
            
            res.end(fileContents, "utf-8")
        }
    }
    
}

export default createUtils
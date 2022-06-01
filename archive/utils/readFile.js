import * as path from "path";
import * as fs from "fs";

import { __dirname } from "../globals.js";

const cachedFiles = {};
const readFile = (filename, rebuild = true) => {
    filename = path.resolve(__dirname, filename);
    if (cachedFiles.hasOwnProperty(filename) && !rebuild) {
        return cachedFiles[filename];
    }

    const fileContent = fs.readFileSync(filename, "utf-8");
    cachedFiles[filename] = fileContent;
    return fileContent;
};

export default readFile;

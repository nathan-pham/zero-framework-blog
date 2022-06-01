import * as path from "path";
import * as fs from "fs";

const getAllFiles = (directory) => {
    const files = fs.readdirSync(directory);

    return files
        .map((file) => {
            const filePath = path.join(directory, file);
            const status = fs.statSync(filePath);

            if (status.isDirectory()) {
                return getAllFiles(filePath);
            } else if (status.isFile()) {
                return filePath;
            }
        })
        .filter((exists) => exists)
        .flat(Infinity)
        .map((pathname) => pathname.replace("\\", "/"));
};

export default getAllFiles;

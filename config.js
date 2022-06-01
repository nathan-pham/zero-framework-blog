import { fileURLToPath } from "url";
import { dirname } from "path";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    port: 5500,
    author: {
        avatar: "https://pbs.twimg.com/profile_images/1520125126271922179/ds8zJhJV_400x400.jpg",
        name: "Nathan Pham",
        bio: "Mathematician, designer, farmer, student. Engineer would be stretching the titles a bit.",
        links: {
            github: "https://github.com/nathan-pham",
            twitter: "https://twitter.com/phamn23",
            personal: "https://nathanpham.me",
        },
    },
};

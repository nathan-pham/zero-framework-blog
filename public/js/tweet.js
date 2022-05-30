const BASE = "https://twitter.com/intent/tweet";

const tweetPost = (el) => {
    const params = new URLSearchParams();
    params.append("url", location.href);
    params.append("text", "Amazing article by Nathan Pham");
    params.append("hashtags", "zeroframeworkblog");

    const href = `${BASE}?${params.toString()}`;
    el.href = href;
};

export default tweetPost;

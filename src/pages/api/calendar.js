import dotenv from "dotenv";

dotenv.config();

export const prerender = false;

const icalURL = process.env.ICAL_LINK;

const cache = {
    data: null,
    lastUpdated: null,
    ttl: 1000 * 60 * 5, // 5 min
};

const cacheHeaders = {
    "Cache-Control": "public, s-maxage=" + cache.ttl / 1000,
    "CDN-Cache-Control": "public, s-maxage=" + cache.ttl / 1000,
    "Vercel-CDN-Cache-Control": "public, s-maxage=" + cache.ttl / 1000,
};

export const GET = async () => {
    if (!icalURL) {
        return new Response(null, {
            status: 500,
            statusText: "Internal Server Error",
        });
    }

    if (cache.data && cache.lastUpdated + cache.ttl > Date.now()) {
        console.log("Using cache");
        return new Response(cache.data, {
            status: 200,
            headers: cacheHeaders,
        });
    }

    try {
        const response = await fetch(icalURL);
        const data = await response.text();

        cache.data = data;
        cache.lastUpdated = Date.now();

        console.log("Updated cache");

        return new Response(data, {
            status: 200,
            headers: cacheHeaders,
        });
    } catch (error) {
        return new Response(null, {
            status: 500,
            statusText: "Internal Server Error",
        });
    }

    return redirect(`/contact/success?id=${submission.id}`);
};

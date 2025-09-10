import dotenv from "dotenv";
import ICAL from "ical.js";

dotenv.config();

export const prerender = false;

const icalURL = process.env.ICAL_LINK;

const cache = {
    events: [],
    lastUpdated: null,
    ttl: 1000 * 60 * 5, // 5 min,
    contentType: "application/json",
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

    if (cache.events && cache.lastUpdated + cache.ttl > Date.now()) {
        console.log("Using cache");
        return new Response(JSON.stringify({events: cache.events}), {
            status: 200,
            headers: cacheHeaders,
        });
    }

    try {
        const response = await fetch(icalURL);
        const icalData = await response.text();

        const parsed = ICAL.parse(icalData);
        const events = [];
        // Inspired by https://github.com/larrybolt/online-ics-feed-viewer/blob/33ebdae5c44048517507b82105b1230d7319ba3b/script.js#L16
        const firstOfMonth = new Date();
        firstOfMonth.setDate(0); // Set to last day of previous month
        firstOfMonth.setHours(0, 0, 0, 0);
        parsed[2].map(([type, event_fields]) => {
            if (type !== "vevent") {
                return;
            }
            
            const start = new Date(event_fields.find((item) => item[0] === "dtstart")[3]);
            const end = event_fields.find((item) => item[0] === "dtend")?.[3] ? new Date(event_fields.find((item) => item[0] === "dtend")?.[3]) : null;

            // If the event is before the start of the current month, skip it
            if (end && end < firstOfMonth) {
                return;
            }

            if (start && end) {
                const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                if (totalDays > 1) {
                    for (let i = 0; i < totalDays; i++) {
                        const day = new Date(start);
                        day.setDate(start.getDate() + i);
                        events.push({ start: day, end: day, title: i === 0 ? "Busy" : "", display: "background" });
                    }
                    return;
                }
            }


            events.push({ start, end, title: "Busy", display: "background" });
        });

        cache.events = events;
        cache.lastUpdated = Date.now();

        console.log("Updated cache");

        return new Response(JSON.stringify({events}), {
            status: 200,
            headers: cacheHeaders,
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: "Failed to fetch calendar"
        }), {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
};

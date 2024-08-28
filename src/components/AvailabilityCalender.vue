<template>
    <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import ICAL from "ical.js";
// import interactionPlugin from '@fullcalendar/interaction'

export default {
    components: {
        FullCalendar,
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin],
                // initialView: 'dayGridMonth '
            },
        };
    },
    methods: {
        // https://github.com/larrybolt/online-ics-feed-viewer/blob/33ebdae5c44048517507b82105b1230d7319ba3b/script.js#L16
        load_ics(ics_data) {
            const mapping = {
                dtstart: "start",
                dtend: "end",
                summary: "title",
            };

            const value_type_mapping = {
                "date-time": (input) => {
                    if (input.substr(-3) === "T::") {
                        return input.substr(0, input.length - 3);
                    }
                    return input;
                },
            };

            const parsed = ICAL.parse(ics_data);
            const events = [];
            parsed[2].map(([type, event_fields]) => {
                if (type !== "vevent") {
                    return;
                }
                console.log({ event_fields });
                const start = event_fields.find((item) => item[0] === "dtstart")[3];
                const end = event_fields.find(item => item[0] === "dtend")?.[3] || null; // Handle case where dtend might not exist
                const title = event_fields.find((item) => item[0] === "summary")[3];

                events.push({ start, end, title });
            });

            console.log({ events });
            this.calendarOptions.events = events;

            // $("#calendar").fullCalendar("removeEventSources");
            // $("#calendar").fullCalendar("addEventSource", events);
        },
    },
    async mounted() {
        let icalLink =
            "https://calendar.proton.me/api/calendar/v1/url/rLJCu09XrebwHPIHvnh84CWUW6Z3OB8NQwO_U1u95rmEFZ7MHYp5oHatvlihme2K5DuyWbGembIlXnIN1xqwFw==/calendar.ics?CacheKey=s7zwnpz8FFqStfFb3NwSAA%3D%3D";
        const response = await fetch(icalLink);
        const icalData = await response.text();
        console.log({ icalData });
        this.load_ics(icalData);
    },
};
</script>

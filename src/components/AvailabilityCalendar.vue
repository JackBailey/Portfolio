<template>
    <div class="calendar-outer">
        <FullCalendar :options="calendarOptions" />
    </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import ICAL from "ical.js";

export default {
    props: {
        icalLink: {
            type: String,
            required: true,
        },
    },
    components: {
        FullCalendar,
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin],
                height: "auto",
            },
        };
    },
    methods: {
        // Inspired by https://github.com/larrybolt/online-ics-feed-viewer/blob/33ebdae5c44048517507b82105b1230d7319ba3b/script.js#L16
        load_ics(ics_data) {
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

            this.calendarOptions.events = events;
        },
    },
    async mounted() {
        const response = await fetch(this.icalLink);
        const icalData = await response.text();
        this.load_ics(icalData);
    },
};
</script>

<style lang="scss" scoped>
.calendar-outer {
    @media screen and (max-width: 768px){
        :deep(.fc-header-toolbar.fc-toolbar) {
            flex-direction: column;
            align-items: start;
        }
    }
}
</style>

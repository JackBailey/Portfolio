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
    components: {
        FullCalendar,
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin],
                height: "auto",
                firstDay: 1,
                defaultAllDay: true,
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
                
                const start = new Date(event_fields.find((item) => item[0] === "dtstart")[3]);
                const end = event_fields.find((item) => item[0] === "dtend")?.[3] ? new Date(event_fields.find((item) => item[0] === "dtend")?.[3]) : null;
                const title = event_fields.find((item) => item[0] === "summary")[3];
                if (start && end) {
                    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                    if (totalDays > 1) {
                        for (let i = 0; i < totalDays; i++) {
                            const day = new Date(start);
                            day.setDate(start.getDate() + i);
                            events.push({ start: day, end: day, title: i === 0 ? title : "", display: "background" });
                        }
                        return;
                    }
                }


                events.push({ start, end, title, display: "background" });
            });

            this.calendarOptions.events = events;
        },
    },
    async mounted() {
        const response = await fetch("/api/calendar");
        const icalData = await response.text();
        this.load_ics(icalData);
    },
};
</script>

<style lang="scss" scoped>
.calendar-outer {
    @media screen and (max-width: 768px) {
        :deep(.fc-header-toolbar.fc-toolbar) {
            flex-direction: column;
            align-items: start;
            gap: 0.5rem;
        }
    }
    :deep(.fc) {
        .fc-event-title {
            color: var(--accent-foreground);
        }
        .fc-day:has(.fc-event) .fc-daygrid-day-number {
            color: var(--accent-foreground);
        }
        .fc-daygrid-day.fc-day-today {
            background-image: linear-gradient(
                45deg, 
                var(--accent) 25%, 
                transparent 25%, 
                transparent 50%, 
                var(--accent) 50%, 
                var(--accent) 75%, 
                transparent 75%, 
                transparent
            );
            background-size: 5px 5px;
        }
    }
}
</style>

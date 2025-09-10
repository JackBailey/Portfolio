<template>
    <div class="calendar-outer">
        <div class="loading" v-if="loading">
            <span class="loader"></span>
            <span>Loading...</span>
        </div>
        <FullCalendar :options="calendarOptions" />
        
    </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
    components: {
        FullCalendar,
    },
    data() {
        const now = new Date();
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstOfMonthStr = [
            firstOfMonth.getFullYear(),
            String(firstOfMonth.getMonth() + 1).padStart(2, '0'),
            String(firstOfMonth.getDate()).padStart(2, '0')
        ].join('-');
        return {
            calendarOptions: {
                plugins: [dayGridPlugin],
                height: "auto",
                firstDay: 1,
                defaultAllDay: true,
                validRange: {
                    start: firstOfMonthStr,
                },
            },
            loading: true,
        };
    },
    methods: {
        load_ics(ics_data) {
            this.calendarOptions.events = ics_data;
        },
    },
    async mounted() {
        this.loading = true;
        await new Promise((r) => setTimeout(r, 1500)); // Simulate loading time
        const response = await fetch("/api/calendar");
        const icalData = await response.json();
        this.load_ics(icalData);
        this.loading = false;
    },
};
</script>

<style lang="scss" scoped>
.calendar-outer {
    position: relative;
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: var(--background-1);
        padding: 1rem 2rem;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translate(-50%, -50%);
        z-index: 5;
        .loader {
            width: 48px;
            height: 48px;
            display: inline-block;
            position: relative;
            border: 3px solid;
            border-color: var(--accent) #0000 var(--foreground-1) #0000;
            border-radius: 50%;
            box-sizing: border-box;
            animation: 1s rotate linear infinite;
        }
        .loader:before , .loader:after{
            content: '';
            top: 0;
            left: 0;
            position: absolute;
            border: 10px solid transparent;
            border-bottom-color: var(--foreground-1);
            transform: translate(-10px, 19px) rotate(-35deg);
        }
        .loader:after {
            border-color: var(--accent) #0000 #0000 #0000 ;
            transform: translate(32px, 3px) rotate(-35deg);
        }
        @keyframes rotate {
            100%{    transform: rotate(360deg)}
        }

    }
    @media screen and (max-width: 768px) {
        :deep(.fc) {
            .fc-header-toolbar.fc-toolbar {
                flex-direction: column;
                align-items: start;
                gap: 0.5rem;
            }
            .fc-event-title { 
                position: absolute;
                bottom: 0;
            }
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

'use client';

import { useRef, useEffect } from "react";
import posthog from "posthog-js";
import Explorebtn from "@/components/Explorebtn";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";

const Page = () => {
    const eventsSectionRef = useRef<HTMLDivElement>(null);

    // Track when the featured events section becomes visible (syncing with IntersectionObserver browser API)
    useEffect(() => {
        const node = eventsSectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    posthog.capture("featured_events_viewed", {
                        events_count: events.length,
                        event_types: [...new Set(events.map((e) => e.type))],
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <section>
            <h1 className="text-center">The Hub For Every Dev <br/> Events You Can&apos;t Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and conferences, All in one place</p>

            <Explorebtn eventsCount={events.length} />

            <div ref={eventsSectionRef} className="mt-20 space-y-7" id="events">
                <h3>Featured Events</h3>

                <ol className="events">
                    {events.map((event) => (
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ol>
            </div>

        </section>
    )
}
export default Page

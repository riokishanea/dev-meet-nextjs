'use client';

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    time: string;
    date: string;
    type: string;
    organizer: string;
}

const EventCard = ({ title, image, location, time, date, slug, type, organizer } : Props) => {
    const handleClick = () => {
        posthog.capture("event_card_clicked", {
            event_title: title,
            event_slug: slug,
            event_type: type,
            event_organizer: organizer,
            event_location: location,
            event_date: date,
        });
    };

    return (
        <Link href={`/events`} id="event-card" onClick={handleClick}>
            <Image src={image} alt={title} width={410} height={300} className="poster" />

            <div className="flex flex-row gap-2">
                <Image src='/icons/pin.svg' alt="location" width={14} height={14} />
                <p>{location}</p>
            </div>

            <p className="title">{title}</p>

            <div className="datetime">
                <div className="date">
                    <Image src="/icons/calendar.svg" alt='date' width={14} height={14} />
                    <p>{date}</p>
                </div>
                <div className="time">
                    <Image src="/icons/clock.svg" alt='time' width={14} height={14} />
                    <p>{time}</p>
                </div>
            </div>
        </Link>
    )
}
export default EventCard

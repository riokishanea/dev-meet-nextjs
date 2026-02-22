'use client';

import Image from "next/image";
import posthog from "posthog-js";

interface ExploreBtnProps {
    eventsCount?: number;
}

const Explorebtn = ({ eventsCount }: ExploreBtnProps) => {
    const handleClick = () => {
        posthog.capture("explore_events_clicked", {
            events_count: eventsCount,
        });
    };

    return (
        <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={handleClick}>
            <a href={"#events"}>
                Explore Events
                <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24}/>
            </a>
        </button>
    )
}
export default Explorebtn

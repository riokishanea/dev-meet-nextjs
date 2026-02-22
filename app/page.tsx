import Explorebtn from "@/components/Explorebtn";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants";

const Page = () => {
    return (
        <section>
            <h1 className="text-center">The Hub For Every Dev <br/> Events You Can't Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and conferences, All in one place</p>

            <Explorebtn/>

            <div className="mt-20 space-y-7">
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

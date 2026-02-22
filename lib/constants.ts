export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  type: "conference" | "hackathon" | "meetup";
  organizer: string;
};

export const events: EventItem[] = [
  {
    title: "Google I/O 2026",
    image: "/images/event1.png",
    slug: "google-io-2026",
    location: "Mountain View, California, USA",
    date: "May 2026 (expected)",
    time: "9:00 AM PT",
    type: "conference",
    organizer: "Google",
  },
  {
    title: "WWDC 2026",
    image: "/images/event2.png",
    slug: "wwdc-2026",
    location: "Cupertino, California, USA",
    date: "June 2026 (expected)",
    time: "10:00 AM PT",
    type: "conference",
    organizer: "Apple",
  },
  {
    title: "KubeCon + CloudNativeCon North America 2026",
    image: "/images/event3.png",
    slug: "kubecon-cloudnativecon-na-2026",
    location: "North America (city TBA)",
    date: "November 2026 (expected)",
    time: "9:00 AM Local",
    type: "conference",
    organizer: "Cloud Native Computing Foundation",
  },
  {
    title: "DEF CON 34",
    image: "/images/event4.png",
    slug: "def-con-34",
    location: "Las Vegas, Nevada, USA",
    date: "August 2026 (expected)",
    time: "8:00 AM PT",
    type: "conference",
    organizer: "DEF CON Communications",
  },
  {
    title: "AWS re:Invent 2026",
    image: "/images/event5.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, Nevada, USA",
    date: "Late November 2026 (expected)",
    time: "8:30 AM PT",
    type: "conference",
    organizer: "Amazon Web Services",
  },
  {
    title: "HackMIT 2026",
    image: "/images/event6.png",
    slug: "hackmit-2026",
    location: "Cambridge, Massachusetts, USA",
    date: "September 2026 (expected)",
    time: "9:00 AM ET",
    type: "hackathon",
    organizer: "MIT students",
  },
  {
    title: "React Summit 2026",
    image: "/images/event-full.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands + Online",
    date: "June 2026 (expected)",
    time: "10:00 AM CEST",
    type: "conference",
    organizer: "GitNation",
  },
];

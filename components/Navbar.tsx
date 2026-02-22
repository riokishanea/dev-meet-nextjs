'use client';

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const Navbar = () => {
    const handleNavClick = (label: string, href: string) => {
        posthog.capture("navbar_link_clicked", {
            link_label: label,
            link_href: href,
        });
    };

    return (
        <header>
            <nav>
                <Link href='/' className="logo">
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24}/>
                </Link>
                <ul>
                    <Link href='/' onClick={() => handleNavClick("Home", "/")}>Home</Link>
                    <Link href='/' onClick={() => handleNavClick("About", "/")}>About</Link>
                    <Link href='/' onClick={() => handleNavClick("Create Event", "/")}>Create Event</Link>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar

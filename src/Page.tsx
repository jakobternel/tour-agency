import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import BentoLayout from "./components/BentoLayout";
import DestinationLayout from "./components/DestinationInfo";
import Itinerary from "./components/Itinerary";
import Inclusions from "./components/Inclusions";
import Booking from "./components/Booking";
import Testimonials from "./components/Testimonials";
import Credits from "./components/Credits";

import tourData from "./data/tourData.json";

const Page: React.FC = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollPosition(window.scrollY);

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-red-50">
            <Hero
                data={tourData[0].heroContent}
                scrollPosition={scrollPosition}
            />
            <BentoLayout
                data={tourData[0].bentoContent}
                destinationName={`${tourData[0].destinationInfoContent.city}, ${tourData[0].destinationInfoContent.country}`}
            />
            <DestinationLayout data={tourData[0].destinationInfoContent} />
            <Itinerary data={tourData[0].itineraryContent} />
            <Inclusions />
            <Booking
                itineraryContent={tourData[0].itineraryContent}
                bookingContent={tourData[0].bookingContent}
            />
            <Testimonials />
            <Credits />
        </div>
    );
};

export default Page;

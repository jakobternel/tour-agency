import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import BentoLayout from "./components/BentoLayout";
import DestinationLayout from "./components/DestinationInfo";
import Itinerary from "./components/Itinerary";
import Inclusions from "./components/Inclusions";
import Testimonials from "./components/Testimonials";
import Credits from "./components/Credits";

import tourData from "./tourData.json";

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
            <BentoLayout data={tourData[0].bentoContent} />
            <DestinationLayout data={tourData[0].destinationInfoContent} />
            <Itinerary data={tourData[0].itineraryContent} />
            <Inclusions />
            <Testimonials />
            <Credits />
        </div>
    );
};

export default Page;

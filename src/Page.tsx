import { useEffect, useState } from "react";
import BentoLayout from "./components/BentoLayout";
import Credits from "./components/Credits";
import Hero from "./components/Hero";
import DestinationLayout from "./components/DestinationInfo";
import Inclusions from "./components/Inclusions";
import Itinerary from "./components/Itinerary";

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
            <Hero scrollPosition={scrollPosition} />
            <BentoLayout data={tourData[0].bentoContent} />
            <DestinationLayout data={tourData[0].destinationInfoContent} />
            <Itinerary data={tourData[0].itineraryContent} />
            <Inclusions />
            <Credits />
        </div>
    );
};

export default Page;

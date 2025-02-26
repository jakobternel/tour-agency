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
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [currentPage, changeCurrentPage] = useState<number>(0);

    const totalPages = Object.keys(tourData).length;
    const tourDataHeroEntries = Object.values(tourData).map((tour) => {
        return tour.heroContent;
    });

    useEffect(() => {
        const handleScroll = () => setScrollPosition(window.scrollY);

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const changePage = (input: number) => {
        if (input > 0) {
            changeCurrentPage((prevPage) => (prevPage + 1) % totalPages);
        } else {
            changeCurrentPage(
                (prevPage) => (prevPage - 1 + totalPages) % totalPages
            );
        }
    };

    return (
        <div className="bg-red-50">
            <Hero
                data={tourDataHeroEntries}
                scrollPosition={scrollPosition}
                changePage={changePage}
                currentPage={currentPage}
            />
            <BentoLayout
                data={tourData[0].bentoContent}
                destinationName={`${tourData[0].destinationInfoContent.city}, ${tourData[0].destinationInfoContent.country}`}
                basePrice={tourData[0].bookingContent.basePrice}
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

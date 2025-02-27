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

    const tourDataArray = Object.values(tourData);

    const tourDataHeroEntries = tourDataArray.map((tour) => {
        return tour.heroContent;
    });

    useEffect(() => {
        const handleScroll = () => setScrollPosition(window.scrollY);

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const changePage = (input: number, specificPage: boolean) => {
        if (specificPage) {
            changeCurrentPage(input);
            return;
        }

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
                data={tourDataArray[currentPage].bentoContent}
                destinationName={`${tourDataArray[currentPage].destinationInfoContent.city}, ${tourDataArray[currentPage].destinationInfoContent.country}`}
                basePrice={tourDataArray[currentPage].bookingContent.basePrice}
            />
            <DestinationLayout
                data={tourDataArray[currentPage].destinationInfoContent}
            />
            <Itinerary data={tourDataArray[currentPage].itineraryContent} />
            <Inclusions />
            <Booking
                itineraryContent={tourDataArray[currentPage].itineraryContent}
                bookingContent={tourDataArray[currentPage].bookingContent}
            />
            <Testimonials />
            <Credits />
        </div>
    );
};

export default Page;

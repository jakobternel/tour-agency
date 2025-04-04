import { useEffect, useRef, useState } from "react";

import Hero from "./components/Hero";
import BentoLayout from "./components/BentoLayout";
import DestinationLayout from "./components/DestinationInfo";
import Itinerary from "./components/Itinerary";
import Inclusions from "./components/Inclusions";
import Booking from "./components/Booking";
import Testimonials from "./components/Testimonials";
import Credits from "./components/Credits";

import tourData from "./data/tourData.json";
import { APIResultsType } from "./types/ApiResults";

const Page: React.FC = () => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [currentPage, changeCurrentPage] = useState<number>(0);
    const [apiResults, setApiResults] = useState<APIResultsType>({
        flights: {},
        flightInformation: {},
    });
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    const bookingRef = useRef<HTMLDivElement | null>(null);
    const itineraryRef = useRef<HTMLDivElement | null>(null);

    const scrollToRef = (inputRef: React.RefObject<HTMLDivElement | null>) => {
        if (inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: "smooth" });
        }

        return;
    };

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
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
                scrollToRef={scrollToRef}
                itineraryRef={itineraryRef}
                isMobile={isMobile}
            />
            <BentoLayout
                data={tourDataArray[currentPage].bentoContent}
                destinationName={`${tourDataArray[currentPage].destinationInfoContent.city}, ${tourDataArray[currentPage].destinationInfoContent.country}`}
                basePrice={tourDataArray[currentPage].bookingContent.basePrice}
                scrollToRef={scrollToRef}
                bookingRef={bookingRef}
                itineraryRef={itineraryRef}
                apiResults={apiResults}
                setApiResults={setApiResults}
                tourLength={
                    Object.values(tourDataArray[currentPage].itineraryContent)
                        .length
                }
                isMobile={isMobile}
            />
            <DestinationLayout
                data={tourDataArray[currentPage].destinationInfoContent}
                scrollToRef={scrollToRef}
                bookingRef={bookingRef}
            />
            <Itinerary
                data={tourDataArray[currentPage].itineraryContent}
                mapCentrePoint={
                    tourDataArray[currentPage].bentoContent.destinationCoords
                }
                itineraryRef={itineraryRef}
            />
            <Inclusions />
            <Booking
                itineraryContent={tourDataArray[currentPage].itineraryContent}
                bookingContent={tourDataArray[currentPage].bookingContent}
                bookingRef={bookingRef}
                apiResults={apiResults}
                setApiResults={setApiResults}
                arrAirport={tourDataArray[currentPage].bentoContent.arrAirport}
                isMobile={isMobile}
            />
            <Testimonials />
            <Credits />
        </div>
    );
};

export default Page;

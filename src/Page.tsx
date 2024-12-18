import { useEffect, useState } from "react";
import BentoLayout from "./components/BentoLayout";
import Credits from "./components/Credits";
import Hero from "./components/Hero";
import DestinationLayout from "./components/DestinationInfo";
import Inclusions from "./components/Inclusions";

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
            <BentoLayout />
            <DestinationLayout />
            <Inclusions />
            <Credits />
        </div>
    );
};

export default Page;

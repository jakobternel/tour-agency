/* TODO 3 - Optional optimization. Only load images for n+1 and n-1 parallax. Keep loaded images in array or change format to use object format. Only store images as needed to reduce load times and prioritise current destination

{0: [], (Initial View) 
1: [],
...n-1: null,
n: []}

*/

import { useEffect, useRef, useState } from "react";
import { HeroContent } from "../types/InputData";

const logo = require("../images/shared/logo_white.png");

const Hero: React.FC<{
    data: HeroContent[];
    scrollPosition: number;
    changePage: (input: number, specificPage: boolean) => void;
    currentPage: number;
    scrollToRef: (ref: React.MutableRefObject<HTMLDivElement | null>) => void;
    itineraryRef: React.MutableRefObject<HTMLDivElement | null>;
    isMobile: boolean;
}> = ({
    data,
    scrollPosition,
    changePage,
    currentPage,
    scrollToRef,
    itineraryRef,
    isMobile,
}) => {
    const [mousePosition, setMousePosition] = useState<[number, number]>([
        window.innerWidth / 2,
        window.innerHeight / 2,
    ]);
    const [parallaxImages, setParallaxImages] = useState<string[][] | null>();
    const parallaxRef = useRef<HTMLDivElement | null>(null);

    const [destinationName, setDestinationName] = useState<string>(
        data[0].name
    );

    useEffect(() => {
        if (isMobile) {
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            if (!parallaxRef.current) return;

            setMousePosition([
                event.clientX - window.innerWidth / 2,
                event.clientY - window.innerHeight / 2,
            ]);
        };

        const element = parallaxRef.current;
        element?.addEventListener("mousemove", (event) =>
            handleMouseMove(event)
        );

        return () => element?.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const images = data.map((locationData) => {
            return locationData.heroImageNames.map((imageRoute: string) => {
                return require(`../images/${locationData.heroImageFolderRoute}/${imageRoute}`);
            });
        });

        setParallaxImages(images);
    }, [data]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const transitionName = () => {
            const targetName = data[currentPage].name;

            if (destinationName === targetName) return;

            if (
                destinationName.length > targetName.length ||
                !targetName.startsWith(destinationName)
            ) {
                setDestinationName((prev) => prev.slice(0, -1));
            } else {
                setDestinationName((prev) =>
                    targetName.slice(0, prev.length + 1)
                );
            }
        };

        timeout = setTimeout(transitionName, 100);

        return () => clearTimeout(timeout);
    }, [destinationName, currentPage, data]);

    const node = (index: number) => {
        return (
            <span
                className="cursor-pointer bg-none border-white rounded-full border-2 h-4 w-4 relative"
                onClick={() => {
                    changePage(index, true);
                }}
            >
                <span
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[6px] h-[6px] rounded-full transition-all"
                    style={{ opacity: index === currentPage ? "1" : "0" }}
                ></span>
            </span>
        );
    };

    const connection = (
        <span className="bg-white w-4 h-0.5 rounded-full"></span>
    );
    const parallaxElement = (image: any, index: number, pageId: number) => {
        return (
            <div
                className={`w-full h-screen flex-shrink-0 absolute ${
                    pageId !== currentPage ? "overflow-hidden" : ""
                }`}
                style={{
                    zIndex: index,
                    left:
                        currentPage === pageId
                            ? index * mousePosition[0] * 0.01
                            : 0,
                    top:
                        currentPage === pageId
                            ? index * mousePosition[1] * 0.01
                            : 0,
                    transition: "all 0.1s ease",
                }}
            >
                <div
                    className="w-full h-full bg-cover bg-center scale-[1.1] brightness-50"
                    key={index}
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                ></div>
            </div>
        );
    };

    const generateParallaxSections = () => {
        return data.map((_, locationIndex) => {
            return (
                <div
                    className="absolute w-full h-screen overflow-hidden transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(${
                            (locationIndex - currentPage) * 100
                        }%)`,
                    }}
                >
                    <div className="flex  h-full w-full">
                        {parallaxImages &&
                            parallaxImages[locationIndex]
                                .reverse()
                                .map((imageSrc, index) =>
                                    parallaxElement(
                                        imageSrc,
                                        parallaxImages.length - index,
                                        locationIndex
                                    )
                                )}
                    </div>
                </div>
            );
        });
    };

    return (
        <div
            ref={parallaxRef}
            className="h-screen w-full origin-top"
            style={{
                transform: `scale(${Math.max(
                    0.9,
                    1 - (scrollPosition / window.innerHeight) * 0.9 * 0.1
                )})`,
            }}
        >
            <div
                className="w-full h-full relative overflow-hidden"
                style={{
                    borderBottomLeftRadius: `${
                        Math.max(
                            0,
                            Math.min(scrollPosition / window.innerHeight, 1)
                        ) * 24
                    }px`,
                    borderBottomRightRadius: `${
                        Math.max(
                            0,
                            Math.min(scrollPosition / window.innerHeight, 1)
                        ) * 24
                    }px`,
                }}
            >
                {generateParallaxSections()}
                <div
                    className="absolute w-full h-60 bottom-0 z-50"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
                        opacity: Math.max(
                            0,
                            1 - scrollPosition / (window.innerHeight * 0.5)
                        ),
                    }}
                ></div>
            </div>

            <div className="z-50 h-full w-full py-10 px-20 absolute left-0 top-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
                    <p className="flex flex-row gap-3 items-center text-white">
                        <span className="font-lobster text-6xl">Jet</span>
                        <span className="text-4xl font-montserrat font-medium">
                            to{" "}
                            <span className="text-primary font-semibold">
                                {destinationName}
                            </span>
                        </span>
                    </p>
                    <button
                        className="bg-primary w-min text-nowrap px-7 py-1 rounded-3xl font-montserrat font-medium transition-colors hover:bg-primaryOff"
                        onClick={() => scrollToRef(itineraryRef)}
                    >
                        Explore More
                    </button>
                </div>

                <div className="flex flex-row gap-5 items-center">
                    <img src={logo} className="h-8" alt="JetSet Logo" />
                    <p className="font-lobster text-3xl text-white">JetSet</p>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 top-12 flex gap-2 items-center">
                    {data.map((_, index) => {
                        if (index + 1 !== data.length) {
                            return [node(index), connection];
                        } else {
                            return node(index);
                        }
                    })}
                </div>

                <div
                    className="absolute left-1/2 -translate-x-1/2 w-5 h-10 border-2 border-white rounded-3xl bottom-10 cursor-pointer"
                    onClick={() => scrollToRef(itineraryRef)}
                >
                    <div className="absolute w-1 h-2 left-1/2 -translate-x-1/2 top-[0.5rem] animate-scroll ease-in-out bg-white rounded-xl"></div>
                </div>

                <div
                    className={`transition-opacity duration-500 ${
                        scrollPosition >= 100
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}
                >
                    <i
                        className="fi fi-rs-angle-right right-20 changePageBtn"
                        onClick={() => changePage(1, false)}
                    ></i>
                    <i
                        className="fi fi-rs-angle-left left-20 changePageBtn"
                        onClick={() => changePage(-1, false)}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default Hero;

import { useEffect, useRef, useState } from "react";

const logo = require("../images/shared/logo_white.png");

const Hero: React.FC<{
    data: {
        name: string;
        heroImageFolderRoute: string;
        heroImageNames: string[];
    };
    scrollPosition: number;
}> = ({ data, scrollPosition }) => {
    const [mousePosition, setMousePosition] = useState<[number, number]>([
        window.innerWidth / 2,
        window.innerHeight / 2,
    ]);
    const [parallaxImages, setParallaxImages] = useState<string[] | null>();
    const parallaxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
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
        const images = data.heroImageNames.map((imageRoute: string) => {
            return require(`../images/${data.heroImageFolderRoute}/${imageRoute}`);
        });

        setParallaxImages(images);
    }, [data]);

    const node = (
        <span className="cursor-pointer bg-none border-white rounded-full border-2 h-4 w-4"></span>
    );
    const connnection = (
        <span className="bg-white w-4 h-0.5 rounded-full"></span>
    );
    const parallaxElement = (image: any, index: number) => {
        return (
            <div
                className="w-full h-full absolute bg-cover bg-center scale-[1.1] brightness-50"
                key={index}
                style={{
                    backgroundImage: `url(${image})`,
                    zIndex: index,
                    left: index * mousePosition[0] * 0.01,
                    top: index * mousePosition[1] * 0.01,
                    transition: "all 0.1s ease",
                }}
            ></div>
        );
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
                <div className="w-full h-full">
                    {parallaxImages &&
                        parallaxImages
                            .reverse()
                            .map((imageSrc, index) =>
                                parallaxElement(
                                    imageSrc,
                                    parallaxImages.length - index
                                )
                            )}
                </div>

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
                            to {data.name}
                        </span>
                    </p>
                    <button className="bg-primary w-min text-nowrap px-7 py-1 rounded-3xl font-montserrat font-medium transition-colors hover:bg-primaryOff">
                        Explore More
                    </button>
                </div>

                <div className="flex flex-row gap-5 items-center">
                    <img src={logo} className="h-8" alt="JetSet Logo" />
                    <p className="font-lobster text-3xl text-white">JetSet</p>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 top-12 flex gap-2 items-center">
                    {node}
                    {connnection}
                    {node}
                    {connnection}
                    {node}
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-10 border-2 border-white rounded-3xl bottom-10 cursor-pointer">
                    <div className="absolute w-1 h-2 left-1/2 -translate-x-1/2 top-[0.5rem] animate-scroll ease-in-out bg-white rounded-xl"></div>
                </div>

                <div>
                    <i className="fi fi-rs-angle-right right-20 changePageBtn"></i>
                    <i className="fi fi-rs-angle-left left-20 changePageBtn"></i>
                </div>
            </div>
        </div>
    );
};

export default Hero;

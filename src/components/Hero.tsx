import { useEffect } from "react";

const image = require("../images/castle.jpg");
const logo = require("../images/logo_white.png");

const Hero: React.FC<{ scrollPosition: number }> = ({ scrollPosition }) => {
    useEffect(() => {
        console.log(
            `${
                Math.max(0, Math.min(scrollPosition / window.innerHeight, 1)) *
                24
            }px`
        );
    }, [scrollPosition]);

    const node = (
        <span className="cursor-pointer bg-none border-white rounded-full border-2 h-4 w-4"></span>
    );
    const connnection = (
        <span className="bg-white w-4 h-0.5 rounded-full"></span>
    );

    return (
        <div
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
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "brightness(50%)",
                    }}
                ></div>

                <div
                    className="absolute w-full h-60 bottom-0"
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
                            to Germany
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

        // <div className="h-screen w-full">
        //     <div className="w-full h-full">
        //         <div
        //             className="w-full h-60 z-10 absolute bottom-0"
        //             style={{
        //                 background:
        //                     "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
        //             }}
        //         ></div>
        //         <div
        //             className="w-full h-full z-1"
        //             style={{
        //                 backgroundImage: `url(${image})`,
        //                 filter: "brightness(50%)",
        //             }}
        //         ></div>
        //     </div>
        //     <div className="z-50 h-full w-full py-10  px-20 absolute left-0 top-0">
        //         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
        //             <p className="flex flex-row gap-3 items-center text-white">
        //                 <span className="font-lobster text-6xl">Jet</span>
        //                 <span className="text-4xl font-montserrat font-medium">
        //                     to Germany
        //                 </span>
        //             </p>

        //             <button className="bg-primary w-min text-nowrap px-7 py-1 rounded-3xl font-montserrat font-medium transition-colors hover:bg-primaryOff">
        //                 Explore More
        //             </button>
        //         </div>
        //         <div className="flex flex-row gap-5 items-center">
        //             <img src={logo} className="h-8" alt="JetSet Logo" />
        //             <p className="font-lobster text-3xl text-white">JetSet</p>
        //         </div>
        //         <div className="absolute left-1/2 -translate-x-1/2 top-12 flex gap-2 items-center">
        //             {node}
        //             {connnection}
        //             {node}
        //             {connnection}
        //             {node}
        //         </div>
        //         <div className="absolute left-1/2 -translate-x-1/2 w-5 h-10 border-2 border-white rounded-3xl bottom-10 cursor-pointer">
        //             <div className="absolute w-1 h-2 left-1/2 -translate-x-1/2 top-[0.5rem] animate-scroll ease-in-out bg-white rounded-xl"></div>
        //         </div>
        //         <div>
        //             <i className="fi fi-rs-angle-right right-20 changePageBtn"></i>
        //             <i className="fi fi-rs-angle-left left-20 changePageBtn"></i>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Hero;

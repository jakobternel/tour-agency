import { useEffect, useState } from "react";

import { getClosestAirport } from "../utils/airportSearch";
import { AirportDataType } from "../types/AirportData";

const BentoLayout: React.FC<{
    data: {
        arrAirport: string;
        itinerary: { [key: string]: { icon: string; content: string } };
    };
}> = ({ data }) => {
    const [closestAirport, setClosestAirport] = useState<string | null>();

    useEffect(() => {
        const initClosestAirport = async () => {
            const result: AirportDataType | {} | null =
                await getClosestAirport();

            if (
                result !== null &&
                Object.keys(result).length !== 0 &&
                "iata_code" in result
            ) {
                setClosestAirport(result.iata_code);
            } else {
                setClosestAirport("LHR");
            }
        };

        initClosestAirport();
    }, []);

    const generateItinerary = () => {
        const itineraryItems = Object.values(data["itinerary"]);
        const itineraryLength = itineraryItems.length;

        const generateItineraryItem = (
            data: {
                icon: string;
                content: string;
            },
            index: number
        ): JSX.Element => {
            return (
                <div
                    key={index}
                    className="flex flex-col items-center gap-2 w-1/5"
                >
                    <div className="rounded-full bg-primary">
                        <i
                            className={`fi ${data.icon} p-5 text-white text-2xl`}
                        ></i>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold mb-1">
                            Day {index + 1}
                        </p>
                        <p className="text-xs">{data.content}</p>
                    </div>
                </div>
            );
        };

        const itemsToShow = itineraryLength > 5 ? 4 : itineraryLength;
        const items: JSX.Element[] = itineraryItems
            .slice(0, itemsToShow)
            .map((item, index) => generateItineraryItem(item, index));

        if (itineraryLength > 5) {
            items.push(
                <div
                    className="flex flex-col items-center w-1/5"
                    key="more-button"
                >
                    <div className="bg-primary hover:bg-primaryOff transition-all text-white font-montserrat font-semibold rounded-full h-16 w-16 flex flex-col justify-center items-center cursor-pointer">
                        <p className="text-sm">More</p>
                        <i className="fi fi-rr-arrow-right"></i>
                    </div>
                </div>
            );
        }

        return items;
    };

    return (
        <div
            className="h-screen w-full py-40 px-20 -mt-10 flex flex-row flex-wrap bg-red-50"
            id="1"
        >
            <div className="w-2/4 h-1/2 p-3">
                <div className="bento flex gap-3 justify-between flex-col">
                    <p className="font-bold font-montserrat">Itinerary</p>
                    <div className="flex flex-row justify-between">
                        {generateItinerary()}
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-1/2 p-3">
                <div className="bento flex justify-between flex-col gap-5">
                    <div className="flex flex-row gap-3">
                        <div className="flex justify-center flex-col">
                            <i className="fi fi-ss-plane text-3xl text-primary"></i>
                        </div>
                        <div className="text-sm">
                            <p className="font-mono font-bold">$8,999</p>
                            <p className="">
                                24hr 30min{" "}
                                <span className="font-[r1em] text-gray-400">
                                    ●
                                </span>{" "}
                                1 stop
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-sm flex flex-row items-center gap-2">
                            <span>{closestAirport}</span>
                            <i className="fi fi-rr-arrow-right"></i>
                            <span>{data.arrAirport}</span>
                        </div>
                        <button className="bg-primary text-white py-1 px-5 rounded-full font-montserrat transition-colors hover:bg-primaryOff">
                            Book
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-1/2 p-3">
                <div className="bento flex flex-col gap-6">
                    <div className="flex flex-row justify-between">
                        <div className="flex gap-3 content-center items-center">
                            <i className="fi fi-br-sun text-3xl text-primary flex items-center"></i>
                            <div className="flex flex-col justify-between">
                                <p className="text-xs">Mostly Clear</p>
                                <p className="text-xs">
                                    <span className="font-bold">H:</span> 24º{" "}
                                    <span className="font-bold">L:</span> 20º
                                </p>
                            </div>
                        </div>
                        <p className="font-bold flex items-center justify-center flex-col text-3xl">
                            24º
                        </p>
                    </div>
                    <div className="w-full flex flex-row h-full gap-3">
                        <div className="w-full h-full rounded-full border-2 border-primary flex flex-col justify-between items-center">
                            <p className="mt-3 font-bold">Tue</p>
                            <i className="fi fi-rr-sun text-2xl flex justify-center"></i>
                            <p className="mb-3">24º</p>
                        </div>
                        <div className="w-full h-full rounded-full border-2 border-primary flex flex-col justify-between items-center">
                            <p className="mt-3 font-bold">Wed</p>
                            <i className="fi fi-rr-cloud text-2xl flex justify-center"></i>
                            <p className="mb-3">24º</p>
                        </div>
                        <div className="w-full h-full rounded-full border-2 border-primary flex flex-col justify-between items-center">
                            <p className="mt-3 font-bold">Thu</p>
                            <i className="fi fi-rr-cloud-showers-heavy text-2xl flex justify-center"></i>
                            <p className="mb-3">24º</p>
                        </div>
                        <div className="w-full h-full rounded-full border-2 border-primary flex flex-col justify-between items-center">
                            <p className="mt-3 font-bold">Fri</p>
                            <i className="fi fi-rr-cloud-showers-heavy text-2xl flex justify-center"></i>
                            <p className="mb-3">24º</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-1/2 p-3">
                <div className="bento flex flex-col">
                    <div className="w-4/5 self-end mb-1 text-xs">
                        Ethan P., Sydney AU
                    </div>
                    <div className="flex flex-row items-end justify-between">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="person"
                        />
                        <span className="text-xs w-4/5 bg-gray-100 p-2 rounded-t-lg rounded-br-lg shadow-lg">
                            An unforgettable experience! The perfect mix of
                            adventure, stunning views, and relaxation. From
                            booking to travel, JetSet made the experience so
                            smooth!
                        </span>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-primary flex flex-row w-min text-xl">
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star-sharp-half-stroke"></i>
                        </div>
                        <div className="text-xs text-gray-600">
                            Rated 4.7 | 1,284 reviews
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-2/4 h-1/2 p-3">
                <div className="bento"></div>
            </div>
            <div className="w-1/4 h-1/2 p-3">
                <div className="bento"></div>
            </div>
        </div>
    );
};

export default BentoLayout;

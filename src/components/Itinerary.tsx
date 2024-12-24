import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

const Itinerary: React.FC<{
    data: {
        [key: string]: {
            title: string;
            description: string[];
            inclusions?: string[];
            suggestions?: string[];
            accomodation?: string;
            meals?: string;
            budget?: string;
        };
    };
}> = ({ data }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;

        if (mapContainerRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/light-v11",
                center: [11.576124, 48.137154],
                scrollZoom: false,
                doubleClickZoom: false,
                dragPan: false,
                zoom: 9,
            });

            mapRef.current.on("load", () => {
                mapRef.current!.getCanvas().style.cursor = "default";
            });
        }

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    const generateListSection = (listHeading: string, listData: string[]) => {
        return (
            <div className="text-sm">
                <span className="font-bold">{listHeading}:</span>

                <ul className="list-disc ml-6">
                    {listData.map((dataItem, index) => {
                        return <li key={index}>{dataItem}</li>;
                    })}
                </ul>
            </div>
        );
    };

    const generateInlineSection = (
        inlineHeading: string,
        inlineData: string
    ) => {
        return (
            <span className="text-sm inline-flex gap-1">
                <span className="font-bold">{inlineHeading}:</span>
                <p>{inlineData}</p>
            </span>
        );
    };

    return (
        <div className="px-20 pt-20 flex flex-row w-full h-screen">
            <div className="h-full w-1/2 bg-white shadow-lg rounded-l-xl p-10 flex flex-col">
                <div className="flex justify-between items-center mb-10">
                    <p className="font-lobster text-3xl">Itinerary</p>
                    <p className="font-montserrat font-semibold">
                        {Object.values(data).length}-day Trip
                    </p>
                    {/* <select className="font-montserrat font-semibold border-primary box-border border-2 rounded-xl px-3 py-2">
                        <option>5-day trip</option>
                        <option>10-day trip</option>
                        <option>14-day trip</option>
                    </select> */}
                </div>
                <div className="w-full flex-grow flex flex-col overflow-y-scroll">
                    {Object.values(data).map(
                        (
                            data: {
                                title: string;
                                description: string[];
                                inclusions?: string[];
                                suggestions?: string[];
                                accomodation?: string;
                                meals?: string;
                                budget?: string;
                            },
                            index: number
                        ) => {
                            return (
                                <div key={index} className="relative">
                                    <div className="flex flex-row gap-3 sticky top-0 bg-white z-10">
                                        <div className="relative">
                                            <div className="h-6 w-6 bg-none border-primary border-2 rounded-full"></div>
                                            <div className="h-3 w-3 bg-primary rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                        </div>
                                        <div className="flex-grow font-montserrat">
                                            Day {index + 1}: {data.title}
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <div className="w-6 flex justify-around flex-shrink-0">
                                            <div className="h-full w-1 border-primary border-dashed border-2"></div>
                                        </div>
                                        <div className="flex-grow py-4 flex flex-col gap-3">
                                            {data.description.map(
                                                (description, index) => {
                                                    return (
                                                        <p
                                                            key={index}
                                                            className="text-sm"
                                                        >
                                                            {description}
                                                        </p>
                                                    );
                                                }
                                            )}
                                            {data.inclusions &&
                                                generateListSection(
                                                    "What's Included",
                                                    data.inclusions
                                                )}
                                            {data.suggestions &&
                                                generateListSection(
                                                    "Suggested Activities",
                                                    data.suggestions
                                                )}
                                            {data.accomodation &&
                                                generateInlineSection(
                                                    "Accomodation",
                                                    data.accomodation
                                                )}
                                            {data.meals &&
                                                generateInlineSection(
                                                    "Meals Included",
                                                    data.meals
                                                )}
                                            {data.budget &&
                                                generateInlineSection(
                                                    "Estimated Additional Expenses",
                                                    data.budget
                                                )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                    <div className="relative w-min">
                        <div className="h-6 w-6 bg-none border-primary border-2 rounded-full"></div>
                        <div className="h-3 w-3 bg-primary rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </div>
            </div>
            <div className="h-full w-1/2 shadow-lg rounded-r-xl">
                <div
                    ref={mapContainerRef}
                    className="map-container h-full rounded-r-xl"
                />
            </div>
        </div>
    );
};

export default Itinerary;

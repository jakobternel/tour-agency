import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

const Itinerary: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        mapboxgl.accessToken =
            "pk.eyJ1Ijoic3RyYXl5eXl5IiwiYSI6ImNsaGtxOTNnaTB1MzEzZHBiNG90aDdndmEifQ.lLpEiGinlcXC0ceOv-yrlA";

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

    return (
        <div className="px-20 pt-20 flex flex-row w-full h-screen">
            <div className="h-full w-1/2 bg-white shadow-lg rounded-l-xl p-10 flex flex-col">
                <div className="flex justify-between items-center mb-10">
                    <p className="font-lobster text-3xl">Itinerary</p>
                    <p className="font-montserrat font-semibold">5-day Trip</p>
                    {/* <select className="font-montserrat font-semibold border-primary box-border border-2 rounded-xl px-3 py-2">
                        <option>5-day trip</option>
                        <option>10-day trip</option>
                        <option>14-day trip</option>
                    </select> */}
                </div>
                <div className="w-full flex-grow flex flex-col overflow-y-scroll">
                    <div className="relative">
                        <div className="flex flex-row gap-3 sticky top-0 bg-white z-10">
                            <div className="relative">
                                <div className="h-6 w-6 bg-none border-primary border-2 rounded-full"></div>
                                <div className="h-3 w-3 bg-primary rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                            <div className="flex-grow font-montserrat">
                                Day 1: Arrive in Munich
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="w-6 flex justify-around flex-shrink-0">
                                <div className="h-full w-1 border-primary border-dashed border-2"></div>
                            </div>
                            <div className="flex-grow py-4 flex flex-col gap-3 mb-5">
                                <p className="text-sm">
                                    Welcome to Munich, where your journey begins
                                    with a warm and relaxing start. After your
                                    arrival, settle into your accommodations and
                                    take a moment to soak in the charm of this
                                    vibrant city. The first day is all about
                                    easing into your adventure — perhaps enjoy a
                                    leisurely stroll around the nearby streets,
                                    savor a traditional Bavarian meal, or simply
                                    unwind after your travels. It's the perfect
                                    way to prepare for the exciting days ahead
                                    while taking in Munich's inviting atmosphere
                                    at your own pace.
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        What's Included:
                                    </span>
                                    <ul className="list-disc ml-6">
                                        <li>Airport Transfers</li>
                                        <li>Free Time</li>
                                        <li>Group Dinner</li>
                                    </ul>
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        Suggested Activities:
                                    </span>
                                    <ul className="list-disc ml-6">
                                        <li>BMW Museum Tour</li>
                                        <li>Bar Crawl</li>
                                    </ul>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Accomodation:
                                    </span>
                                    <p>
                                        Private Room in 4
                                        <sup className="z-0">*</sup> Bavaria
                                        Luxe Retreat
                                    </p>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Meals Included:
                                    </span>
                                    <p>Breakfast, Lunch, Dinner</p>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Estimated Additional Expenses:
                                    </span>
                                    <p>$50-$75</p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex flex-row gap-3 sticky top-0 bg-white z-10">
                            <div className="relative">
                                <div className="h-6 w-6 bg-none border-primary border-2 rounded-full"></div>
                                <div className="h-3 w-3 bg-primary rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                            <div className="flex-grow font-montserrat">
                                Day 2: Explore Munich
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="w-6 flex justify-around flex-shrink-0">
                                <div className="h-full w-1 border-primary border-dashed border-2"></div>
                            </div>
                            <div className="flex-grow py-4 flex flex-col gap-3">
                                <p className="text-sm">
                                    After settling in and getting a feel for
                                    Munich, take some time to explore the city's
                                    unique character at your own pace. Wander
                                    through the Altstadt, where the lively
                                    streets and stunning architecture invite
                                    discovery. Join a guided walking tour to
                                    uncover the stories behind Munich's historic
                                    landmarks and visit one of the city's
                                    renowned museums for a fascinating glimpse
                                    into science and innovation. It's a perfect
                                    way to ease into the rhythm of the city.
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        What's Included:
                                    </span>
                                    <ul className="list-disc ml-6">
                                        <li>Walking Tour</li>
                                        <li>Deutsches Museum Tour</li>
                                        <li>Traditional Bavarian Lunch</li>
                                        <li>Visit to an Artisan Workshop</li>
                                    </ul>
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        Suggested Activities:
                                    </span>
                                    <ul className="list-disc ml-6">
                                        <li>Bavarian Cooking Class</li>
                                        <li>Football Match</li>
                                    </ul>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Accomodation:
                                    </span>
                                    <p>
                                        Private Room in 4
                                        <sup className="z-0">*</sup> Bavaria
                                        Luxe Retreat
                                    </p>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Meals Included:
                                    </span>
                                    <p>Breakfast, Dinner</p>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Estimated Additional Expenses:
                                    </span>
                                    <p>$50-$75</p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex flex-row gap-3 sticky top-0 bg-white z-10">
                            <div className="relative">
                                <div className="h-6 w-6 bg-none border-primary border-2 rounded-full"></div>
                                <div className="h-3 w-3 bg-primary rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                            <div className="flex-grow font-montserrat">
                                Day 3: Visit Neuschwanstein Castle
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="w-6 flex justify-around flex-shrink-0">
                                <div className="h-full w-1 border-primary border-dashed border-2"></div>
                            </div>
                            <div className="flex-grow py-4 flex flex-col gap-3">
                                <p className="text-sm">
                                    On your journey through Bavaria, a visit to
                                    the stunning Neuschwanstein Castle is a
                                    must. Nestled in the Bavarian Alps, this
                                    fairy-tale castle offers breathtaking views
                                    of the surrounding mountains and lakes. As
                                    you explore its grand halls and towers,
                                    you'll be transported back in time to the
                                    era of King Ludwig II, whose vision brought
                                    this architectural masterpiece to life.
                                    Whether you choose to hike up to the castle
                                    or take a scenic horse-drawn carriage ride,
                                    the experience promises to be unforgettable.
                                    Don't forget to snap a photo at the iconic
                                    vantage point, where you can capture the
                                    full beauty of the castle against the
                                    backdrop of the picturesque landscape.
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        What's Included:
                                    </span>
                                    <ul className="list-disc ml-6">
                                        <li>Private Bus Transfer</li>
                                        <li>
                                            Neuschwanstein Castle Entry Tickets
                                        </li>
                                        <li>Lunch at a Local Cafe</li>
                                    </ul>
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        Suggested Activities:
                                    </span>
                                    <ul className="list-disc ml-6">
                                        <li>Brewery Tour</li>
                                        <li>Horse Drawn Carriage</li>
                                    </ul>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Accomodation:
                                    </span>
                                    <p>
                                        Private Room in 4
                                        <sup className="z-0">*</sup> Bavaria
                                        Luxe Retreat
                                    </p>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Meals Included:
                                    </span>
                                    <p>Breakfast, Lunch</p>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Estimated Additional Expenses:
                                    </span>
                                    <p>$75-$100</p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex flex-row gap-3 sticky top-0 bg-white z-10">
                            <div className="relative">
                                <div className="h-6 w-6 bg-none border-primary border-2 rounded-full"></div>
                                <div className="h-3 w-3 bg-primary rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                            <div className="flex-grow font-montserrat">
                                Day 4: Visit Nuremberg
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="w-6 flex justify-around flex-shrink-0">
                                <div className="h-full w-1 border-primary border-dashed border-2"></div>
                            </div>
                            <div className="flex-grow py-4 flex flex-col gap-3">
                                <p className="text-sm">
                                    A visit to Nuremberg offers a fascinating
                                    glimpse into Germany's rich history and
                                    culture. This medieval city, known for its
                                    well-preserved architecture, is home to the
                                    iconic Nuremberg Castle, where you can
                                    explore centuries of history and enjoy
                                    panoramic views of the city. Stroll through
                                    the charming old town, with its narrow
                                    streets and half-timbered houses, and visit
                                    the Germanisches Nationalmuseum to discover
                                    extensive exhibits on art, history, and
                                    culture. Don't miss a visit to the
                                    Documentation Center Nazi Party Rally
                                    Grounds, which provides a thought-provoking
                                    look at Nuremberg's role in the 20th
                                    century.
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        What's Included:
                                    </span>
                                    <ul className="list-disc ml-6">
                                        <li>Private Bus Transfer</li>
                                        <li>Walking Tour</li>
                                        <li>Explore Nuremberg Castle</li>
                                        <li>
                                            Visit the Documentation Center Nazi
                                            Party Rally Grounds
                                        </li>
                                        <li>
                                            Germanisches Nationalmuseum Tour
                                        </li>
                                    </ul>
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        Suggested Activities:
                                    </span>
                                    <ul className="list-disc ml-6">
                                        <li>Boat Tour on the River Pegnitz</li>
                                        <li>Visit Nuremberg Zoo</li>
                                    </ul>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Accomodation:
                                    </span>
                                    <p>
                                        Private Room in 4
                                        <sup className="z-0">*</sup> Bavaria
                                        Luxe Retreat
                                    </p>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Meals Included:
                                    </span>
                                    <p>Breakfast</p>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Estimated Additional Expenses:
                                    </span>
                                    <p>$75-$100</p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex flex-row gap-3 sticky top-0 bg-white z-10">
                            <div className="relative">
                                <div className="h-6 w-6 bg-none border-primary border-2 rounded-full"></div>
                                <div className="h-3 w-3 bg-primary rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                            <div className="flex-grow font-montserrat">
                                Day 5: Departure
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="w-6 flex justify-around flex-shrink-0">
                                <div className="h-full w-1 border-primary border-dashed border-2"></div>
                            </div>
                            <div className="flex-grow py-4 flex flex-col gap-3">
                                <p className="text-sm">
                                    As your time in Munich comes to a close,
                                    take a moment to reflect on the memories
                                    made during your stay. From exploring the
                                    city's historic landmarks and vibrant
                                    neighborhoods to discovering the beauty of
                                    its parks and museums, Munich has certainly
                                    left a lasting impression. Before you
                                    depart, enjoy a final stroll through the
                                    picturesque streets or a relaxing coffee at
                                    a local café, soaking in the last moments of
                                    the city's charm. Whether you're heading to
                                    your next destination or returning home,
                                    Munich's blend of culture, history, and
                                    modernity will remain a highlight of your
                                    travels. Safe travels and until next time!
                                </p>
                                <p className="text-sm">
                                    <span className="font-bold">
                                        What's Included:
                                    </span>
                                    <ul className="list-disc ml-6">
                                        <li>Free Time</li>
                                        <li>Airport Transfers</li>
                                    </ul>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Meals Included:
                                    </span>
                                    <p>Breakfast</p>
                                </p>
                                <p className="text-sm inline-flex gap-1">
                                    <span className="font-bold">
                                        Estimated Additional Expenses:
                                    </span>
                                    <p>$50-$75</p>
                                </p>
                            </div>
                        </div>
                    </div>
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

import { useEffect, useState } from "react";

import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { searchAirports } from "../utils/airportSearch";

const Booking: React.FC<{
    itineraryContent: {
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
    bookingContent: {
        basePrice: number;
        defaultHotel: number;
        hotelContent: {
            [key: string]: {
                name: string;
                dailyAdditionalPrice: number;
            };
        };
        optionalActivities: {
            name: string;
            cost: number;
        }[];
    };
}> = ({ itineraryContent, bookingContent }) => {
    const [departureDate, setDepartureDate] = useState<Date | null>();
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const [fuzzySearchResults, setFuzzySearchResults] = useState<
        { code: string; city: string; country: string }[]
    >([]);
    const [flightSurcharge, setFlightSurcharge] = useState<number>(0);
    const [roomSelection, setRoomSelection] = useState<string>(
        String(bookingContent.defaultHotel)
    );
    const [roomSurcharge, setRoomSurcharge] = useState<number>(0);
    const [tourLength] = useState<number>(
        Object.values(itineraryContent).length
    );
    const [optionalActivities, setOptionalActivities] = useState<number[]>([]);
    const [activitiesSurcharge, setActivitiesSurcharge] = useState<number>(0);

    useEffect(() => {
        const getFuzzySearchResults = async () => {
            const results = await searchAirports(searchInput);

            const airports = results.map((airport) => {
                return {
                    code: airport.item.iata_code,
                    city: airport.item.municipality,
                    country: airport.item.iso_country,
                };
            });

            setFuzzySearchResults(airports);
        };

        getFuzzySearchResults();
    }, [searchInput]);

    useEffect(() => {
        setRoomSurcharge(
            bookingContent.hotelContent[roomSelection].dailyAdditionalPrice *
                (tourLength - 1)
        );
    }, [roomSelection]);

    useEffect(() => {
        let activitiesTotal = 0;

        optionalActivities.forEach((activityIndex) => {
            activitiesTotal +=
                bookingContent.optionalActivities[activityIndex].cost;
        });

        setActivitiesSurcharge(activitiesTotal);
    });

    const formatDollarAmount = (amount: number) => {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-primary w-full h-full py-20 flex justify-center">
            <div className="bg-white rounded-xl shadow-xl py-10 pl-10 pr-6 w-3/4 flex flex-row">
                <div className="w-2/3 flex flex-col gap-3">
                    <p className="font-lobster text-3xl mb-3 text-primary">
                        Booking
                    </p>
                    <div className="flex gap-3 w-1/2 items-center">
                        <div className="text-primary font-bold">Itinerary</div>
                        <div className="flex-grow bg-gray-300 h-1 rounded-full"></div>
                        <div className="text-gray-300">Contact Info</div>
                        <div className="flex-grow bg-gray-300 h-1 rounded-full"></div>
                        <div className="text-gray-300">Payment</div>
                    </div>
                    <div>
                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center relative">
                            <p className="w-1/2">
                                Step 1 - Select Departure Airport
                            </p>
                            <div className="relative w-1/2">
                                <input
                                    type="text"
                                    className="w-full border-2 border-primary p-1 focus:outline-none overflow-ellipsis pr-6"
                                    onFocus={() => setSearchActive(true)}
                                    onBlur={() => {
                                        setTimeout(
                                            () => setSearchActive(false),
                                            150
                                        );
                                    }}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value);
                                    }}
                                    value={searchInput}
                                />
                                {searchActive &&
                                    fuzzySearchResults.length !== 0 && (
                                        <div className="bg-red-50 w-full absolute z-10 border-2 border-primary border-t-0 flex flex-col">
                                            {fuzzySearchResults.map(
                                                (searchResult, index) => {
                                                    return (
                                                        <span
                                                            key={index}
                                                            onClick={() => {
                                                                setSearchInput(
                                                                    `${searchResult.code} - ${searchResult.city}, ${searchResult.country}`
                                                                );
                                                            }}
                                                            className="bg-red-50 hover:bg-red-100 p-1 font-montserrat text-sm border-red-200 cursor-pointer [&:not(:last-child)]:border-b-2 flex flex-row justify-between"
                                                        >
                                                            <p>
                                                                {`${searchResult.code} - ${searchResult.city}, ${searchResult.country}`}
                                                            </p>
                                                            <p>
                                                                {getUnicodeFlagIcon(
                                                                    searchResult.country
                                                                )}
                                                            </p>
                                                        </span>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                <i className="fi fi-br-search absolute top-1/2 -translate-y-1/2 right-2 text-primary"></i>
                            </div>
                        </div>
                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center relative">
                            <p className="w-1/2">
                                Step 2 - Select Arrival Date
                            </p>
                            <input
                                type="date"
                                className="w-1/2 border-2 border-primary p-1 focus:outline-none"
                                onChange={(e) => {
                                    setDepartureDate(new Date(e.target.value));
                                }}
                                min={
                                    new Date(
                                        Date.now() + 7 * 24 * 60 * 60 * 1000
                                    )
                                        .toISOString()
                                        .split("T")[0]
                                }
                                max={
                                    new Date(
                                        new Date().setFullYear(
                                            new Date().getFullYear() + 1
                                        )
                                    )
                                        .toISOString()
                                        .split("T")[0]
                                }
                            />
                            <i className="fi fi-br-calendar-day absolute right-5 text-primary"></i>
                        </div>

                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center relative">
                            <p className="w-1/2">
                                Step 3 - Select Accomodation Type
                            </p>
                            <select
                                className="w-1/2 border-2 border-primary p-1 focus:outline-none"
                                onChange={(e) => {
                                    setRoomSelection(e.target.value);
                                }}
                                value={roomSelection}
                            >
                                {Object.keys(bookingContent.hotelContent).map(
                                    (key) => {
                                        return (
                                            <option key={key} value={key}>
                                                {
                                                    bookingContent.hotelContent[
                                                        key
                                                    ].name
                                                }
                                                : +
                                                {formatDollarAmount(
                                                    bookingContent.hotelContent[
                                                        key
                                                    ].dailyAdditionalPrice
                                                )}
                                                /night
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                            <i className="fi fi-br-angle-down absolute right-5 text-primary"></i>
                        </div>

                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex gap-1 flex-col">
                            <p className="w-1/2">
                                Step 4 - Select Additional Activities
                            </p>
                            <div className="flex flex-wrap mt-2 gap-3">
                                {bookingContent.optionalActivities.map(
                                    (activity, index) => {
                                        return (
                                            <p
                                                className={`border-2 rounded-full border-primary py-1 px-3 text-sm cursor-pointer w-min text-nowrap transition-all ${
                                                    optionalActivities.includes(
                                                        index
                                                    )
                                                        ? "bg-red-100"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    let newActivitiesArray: number[] =
                                                        [];
                                                    if (
                                                        optionalActivities.includes(
                                                            index
                                                        )
                                                    ) {
                                                        newActivitiesArray =
                                                            optionalActivities.filter(
                                                                (item) =>
                                                                    item !==
                                                                    index
                                                            );
                                                    } else {
                                                        newActivitiesArray = [
                                                            ...optionalActivities,
                                                            index,
                                                        ];
                                                    }

                                                    setOptionalActivities(
                                                        newActivitiesArray
                                                    );
                                                }}
                                            >
                                                <span className="font-bold">
                                                    ${activity.cost}
                                                </span>{" "}
                                                {activity.name}
                                            </p>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-6 items-center pr-6 mt-3">
                        <p className="text-gray-500 hover:text-primary transition-all hover:underline cursor-pointer">
                            Previous
                        </p>
                        <p className="px-6 py-2 bg-primary hover:bg-primaryOff transition-all rounded-lg text-white cursor-pointer">
                            Next
                        </p>
                    </div>
                </div>
                <div className="w-1/3 border-l-2 border-gray-200 pl-6 flex flex-col gap-3">
                    <div>
                        {departureDate &&
                            String(departureDate) !== "Invalid Date" && (
                                <>
                                    <p className="font-montserrat font-semibold mb-1">
                                        Trip Dates
                                    </p>
                                    <div className="ml-3">
                                        <div className="flex flex-row justify-between">
                                            <p className="font-montserrat">
                                                Start
                                            </p>
                                            <p className="text-gray-500 font-mono">
                                                {String(
                                                    departureDate.toLocaleDateString(
                                                        "en-GB"
                                                    )
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p className="font-montserrat">
                                                End
                                            </p>
                                            <p className="text-gray-500 font-mono">
                                                {String(
                                                    new Date(
                                                        departureDate.getTime() +
                                                            (tourLength - 1) *
                                                                24 *
                                                                60 *
                                                                60 *
                                                                1000
                                                    ).toLocaleDateString(
                                                        "en-GB"
                                                    )
                                                )}
                                            </p>
                                        </div>
                                        {flightSurcharge > 0 && (
                                            <div className="flex flex-row justify-between">
                                                <p className="font-montserrat">
                                                    Flight Surcharge
                                                </p>
                                                <p className="text-gray-500 font-mono">
                                                    +{" "}
                                                    {formatDollarAmount(
                                                        flightSurcharge
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <p className="font-montserrat font-semibold">
                                Base Price:
                            </p>
                            <p className="font-mono">
                                {formatDollarAmount(bookingContent.basePrice)}
                            </p>
                        </div>
                        <div className="ml-3">
                            <div className="flex flex-row justify-between">
                                <p className="font-montserrat">
                                    {
                                        bookingContent.hotelContent[
                                            roomSelection
                                        ].name
                                    }
                                </p>
                                <p className="text-gray-500 font-mono">
                                    + {formatDollarAmount(roomSurcharge)}
                                </p>
                            </div>
                        </div>
                    </div>
                    {activitiesSurcharge > 0 && (
                        <div>
                            <div className="flex flex-row justify-between">
                                <p className="font-montserrat font-semibold">
                                    Activities Surcharge:
                                </p>
                                <p className="font-mono">
                                    + {formatDollarAmount(activitiesSurcharge)}
                                </p>
                            </div>
                            <div className="ml-3">
                                {optionalActivities.map((activity) => {
                                    return (
                                        <div className="flex flex-row justify-between">
                                            <p className="font-montserrat">
                                                {
                                                    bookingContent
                                                        .optionalActivities[
                                                        activity
                                                    ].name
                                                }
                                            </p>
                                            <p className="text-gray-500 font-mono">
                                                +{" "}
                                                {formatDollarAmount(
                                                    bookingContent
                                                        .optionalActivities[
                                                        activity
                                                    ].cost
                                                )}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div className="flex-grow"></div>
                    <div className="flex justify-between">
                        <p className="font-montserrat font-semibold">
                            Total Price:
                        </p>
                        <p className="font-mono font-bold">
                            {formatDollarAmount(
                                bookingContent.basePrice +
                                    flightSurcharge +
                                    roomSurcharge +
                                    activitiesSurcharge
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;

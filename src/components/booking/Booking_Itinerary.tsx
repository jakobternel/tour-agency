import { useEffect, useState } from "react";
import { searchAirports } from "../../utils/airportSearch";

import getUnicodeFlagIcon from "country-flag-icons/unicode";

const Booking_Itinerary: React.FC<{
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
    optionalActivities: number[];
    roomSelection: string;
    setDepartureDate: React.Dispatch<
        React.SetStateAction<Date | null | undefined>
    >;
    setRoomSelection: React.Dispatch<React.SetStateAction<string>>;
    setOptionalActivities: React.Dispatch<React.SetStateAction<number[]>>;
}> = ({
    bookingContent,
    optionalActivities,
    roomSelection,
    setDepartureDate,
    setRoomSelection,
    setOptionalActivities,
}) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const [fuzzySearchResults, setFuzzySearchResults] = useState<
        { code: string; city: string; country: string }[]
    >([]);

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

    return (
        <div>
            <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center relative">
                <p className="w-1/2">Step 1 - Select Departure Airport</p>
                <div className="relative w-1/2">
                    <input
                        type="text"
                        className="w-full border-2 border-primary py-1 focus:outline-none overflow-ellipsis pr-6 pl-2"
                        onFocus={() => setSearchActive(true)}
                        onBlur={() => {
                            setTimeout(() => setSearchActive(false), 150);
                        }}
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                        }}
                        value={searchInput}
                    />
                    {searchActive && fuzzySearchResults.length !== 0 && (
                        <div className="bg-red-50 w-full absolute z-10 border-2 border-primary border-t-0 flex flex-col">
                            {fuzzySearchResults.map((searchResult, index) => {
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
                            })}
                        </div>
                    )}
                    <i className="fi fi-br-search absolute top-1/2 -translate-y-1/2 right-2 text-primary"></i>
                </div>
            </div>
            <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center relative">
                <p className="w-1/2">Step 2 - Select Arrival Date</p>
                <input
                    type="date"
                    className="w-1/2 border-2 border-primary py-1 focus:outline-none pl-2"
                    onChange={(e) => {
                        setDepartureDate(new Date(e.target.value));
                    }}
                    min={
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                            .toISOString()
                            .split("T")[0]
                    }
                    max={
                        new Date(
                            new Date().setFullYear(new Date().getFullYear() + 1)
                        )
                            .toISOString()
                            .split("T")[0]
                    }
                />
                <i className="fi fi-br-calendar-day absolute right-5 text-primary"></i>
            </div>

            <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center relative">
                <p className="w-1/2">Step 3 - Select Accomodation Type</p>
                <select
                    className="w-1/2 border-2 border-primary py-1 focus:outline-none pl-2"
                    onChange={(e) => {
                        setRoomSelection(e.target.value);
                    }}
                    value={roomSelection}
                >
                    {Object.keys(bookingContent.hotelContent).map((key) => {
                        return (
                            <option key={key} value={key}>
                                {bookingContent.hotelContent[key].name}: +$
                                {
                                    bookingContent.hotelContent[key]
                                        .dailyAdditionalPrice
                                }
                                /night
                            </option>
                        );
                    })}
                </select>
                <i className="fi fi-br-angle-down absolute right-5 text-primary"></i>
            </div>

            <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex gap-1 flex-col">
                <p className="w-1/2">Step 4 - Select Additional Activities</p>
                <div className="flex flex-wrap mt-2 gap-3">
                    {bookingContent.optionalActivities.map(
                        (activity, index) => {
                            return (
                                <p
                                    key={index}
                                    className={`border-2 rounded-full border-primary py-1 px-3 text-sm cursor-pointer w-min text-nowrap transition-all ${
                                        optionalActivities.includes(index)
                                            ? "bg-red-100"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let newActivitiesArray: number[] = [];
                                        if (
                                            optionalActivities.includes(index)
                                        ) {
                                            newActivitiesArray =
                                                optionalActivities.filter(
                                                    (item) => item !== index
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
    );
};

export default Booking_Itinerary;

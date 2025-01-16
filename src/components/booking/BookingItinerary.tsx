import { useEffect, useState } from "react";
import { searchAirports } from "../../utils/airportSearch";

import getUnicodeFlagIcon from "country-flag-icons/unicode";

import { FormInputType } from "../../types/FormInput";

const BookingItinerary: React.FC<{
    formInputs: FormInputType;
    handleInputChange: <T extends keyof FormInputType>(
        section: T,
        field: keyof FormInputType[T],
        value: FormInputType[T][keyof FormInputType[T]]
    ) => void;
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
}> = ({ formInputs, handleInputChange, bookingContent }) => {
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const [fuzzySearchResults, setFuzzySearchResults] = useState<
        { code: string; city: string; country: string }[]
    >([]);

    useEffect(() => {
        const getFuzzySearchResults = async () => {
            const results = await searchAirports(
                formInputs.itinerary.departureAirport || ""
            );

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
    }, [formInputs.itinerary.departureAirport]);

    return (
        <div>
            <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center relative">
                <p className="w-1/2">Step 1 - Select Departure Airport</p>
                <div className="relative w-1/2">
                    <input
                        type="text"
                        className={`w-full border-2 py-1 focus:outline-none outline-none overflow-ellipsis pr-6 pl-2 transition-all focus:border-primary ${
                            formInputs.itinerary.departureAirport
                                ? "border-primary"
                                : "border-red-200"
                        }`}
                        onFocus={() => setSearchActive(true)}
                        onBlur={() => {
                            setTimeout(() => setSearchActive(false), 150);
                        }}
                        onChange={(e) => {
                            handleInputChange(
                                "itinerary",
                                "departureAirport",
                                e.target.value
                            );
                        }}
                        value={formInputs.itinerary.departureAirport}
                    />
                    {searchActive && fuzzySearchResults.length !== 0 && (
                        <div className="bg-red-50 w-full absolute z-10 border-2 border-primary border-t-0 flex flex-col">
                            {fuzzySearchResults.map((searchResult, index) => {
                                return (
                                    <span
                                        key={index}
                                        onClick={() => {
                                            handleInputChange(
                                                "itinerary",
                                                "departureAirport",
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
                    className={`w-1/2 border-2 py-1 pl-2 focus:outline-none outline-none transition-all focus:border-primary ${
                        formInputs.itinerary.departureDate
                            ? "border-primary"
                            : "border-red-200"
                    }`}
                    value={
                        formInputs.itinerary.departureDate
                            ? formInputs.itinerary.departureDate
                                  .toISOString()
                                  .split("T")[0]
                            : ""
                    }
                    onChange={(e) => {
                        handleInputChange(
                            "itinerary",
                            "departureDate",
                            new Date(e.target.value)
                        );
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
                        handleInputChange(
                            "itinerary",
                            "roomSelection",
                            e.target.value
                        );
                    }}
                    value={formInputs.itinerary.roomSelection}
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
                                        formInputs.itinerary.optionalActivities.includes(
                                            index
                                        )
                                            ? "bg-red-100"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let newActivitiesArray: number[] = [];
                                        if (
                                            formInputs.itinerary.optionalActivities.includes(
                                                index
                                            )
                                        ) {
                                            newActivitiesArray =
                                                formInputs.itinerary.optionalActivities.filter(
                                                    (item) => item !== index
                                                );
                                        } else {
                                            newActivitiesArray = [
                                                ...formInputs.itinerary
                                                    .optionalActivities,
                                                index,
                                            ];
                                        }

                                        handleInputChange(
                                            "itinerary",
                                            "optionalActivities",
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

export default BookingItinerary;

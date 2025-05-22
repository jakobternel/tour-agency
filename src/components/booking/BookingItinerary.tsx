import { ReactElement, useEffect, useState } from "react";
import {
    getAirportCodeNameList,
    searchAirports,
} from "../../utils/airportSearch";

import getUnicodeFlagIcon from "country-flag-icons/unicode";

import { FormInputType } from "../../types/FormInput";
import { BookingContent } from "../../types/InputData";
import { ErrorTypes } from "../../types/FormValidation";

import { validationSchemas } from "../../utils/validation";

const BookingItinerary: React.FC<{
    formInputs: FormInputType;
    handleInputChange: <T extends keyof FormInputType>(
        section: T,
        field: keyof FormInputType[T],
        value: FormInputType[T][keyof FormInputType[T]]
    ) => void;
    bookingContent: BookingContent;
    updateErrors: (
        withoutError: boolean,
        fieldCode: string,
        message: string
    ) => void;
    errors: ErrorTypes;
}> = ({
    formInputs,
    handleInputChange,
    bookingContent,
    updateErrors,
    errors,
}) => {
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const [fuzzySearchResults, setFuzzySearchResults] = useState<
        { code: string; city: string; country: string }[]
    >([]);
    const [airportCodeNameList, setAirportCodeNameList] = useState<string[]>(
        []
    );
    const [selectedDay, setSelectedDay] = useState<number>(0);
    const [prevDateInput, setPrevDateInput] = useState<string>("");

    const minDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

    const maxDate = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
    )
        .toISOString()
        .split("T")[0];

    const formatDateString = (
        input: string,
        isDeleting: boolean = false
    ): string => {
        let cleaned = input.replace(/[^\d/]/g, "");

        const slashCount = (cleaned.match(/\//g) || []).length;
        if (slashCount > 2) {
            const parts = cleaned.split("/").filter(Boolean);
            cleaned = parts.slice(0, 3).join("/");
        }

        const parts = cleaned.split("/");

        let day = parts[0] || "";
        let month = parts[1] || "";
        let year = parts[2] || "";

        day = day.replace(/\D/g, "").slice(0, 2);
        month = month.replace(/\D/g, "").slice(0, 2);
        year = year.replace(/\D/g, "").slice(0, 4);

        let formatted = day;

        if ((day.length === 2 && !isDeleting) || parts.length > 1) {
            formatted += "/";
        }

        if (month) {
            formatted += month;
            if ((month.length === 2 && !isDeleting) || parts.length > 2) {
                formatted += "/";
            }
        }

        if (year) {
            formatted += year;
        }

        return formatted;
    };

    const normalizeDate = (date: string): string => {
        const [day, month, year] = date.split("/");
        return `${(day || "").padStart(2, "0")}/${(month || "").padStart(
            2,
            "0"
        )}/${year || ""}`;
    };

    const parseDate = (date: string): string | null => {
        const [day, month, year] = date.split("/");
        if (
            day &&
            month &&
            year &&
            /^\d{1,2}$/.test(day) &&
            /^\d{1,2}$/.test(month) &&
            /^\d{4}$/.test(year)
        ) {
            const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
                2,
                "0"
            )}`;
            const parsed = new Date(isoDate);
            return isNaN(parsed.getTime()) ? null : isoDate;
        }
        return null;
    };

    const formatToDate = (isoDate: string): string => {
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
    };

    const adjustDate = (date: string, min: string, max: string): string => {
        const isoDate = parseDate(date);
        if (!isoDate) return date;

        const input = new Date(isoDate);
        const minDateObj = new Date(min);
        const maxDateObj = new Date(max);

        if (input < minDateObj) return formatToDate(min);
        if (input > maxDateObj) return formatToDate(max);

        return date;
    };

    useEffect(() => {
        const getAirportCodes = async () => {
            const codes = await getAirportCodeNameList();
            setAirportCodeNameList(codes);
        };

        getAirportCodes();
    }, []);

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

    const generateDayLabels = (): ReactElement[] => {
        const uniqueDays = Array.from(
            new Set(bookingContent.optionalActivities.map((a) => a.day))
        ).sort((a, b) => a - b);

        return uniqueDays.map((day) => {
            const activityOnDay = (dayId: number): boolean => {
                const daysSelected =
                    formInputs.itinerary.optionalActivities.flatMap((id) => {
                        return bookingContent.optionalActivities
                            .filter((activity) => activity.id === id)
                            .map((activity) => activity.day);
                    });

                return daysSelected.includes(dayId);
            };

            return (
                <div
                    className={`transition-all text-sm border-primary border-2 cursor-pointer px-2 py-1 rounded-full ${
                        selectedDay === day ? "font-bold" : "font-normal"
                    } ${
                        activityOnDay(day)
                            ? "bg-red-100"
                            : selectedDay === day
                            ? "bg-red-50"
                            : "bg-none"
                    }
                    `}
                    key={`day=${day}`}
                    onClick={() => setSelectedDay(day)}
                >
                    Day {day + 1}
                </div>
            );
        });
    };

    return (
        <div>
            <div className="border-b-gray-200 border-b-2 py-3">
                <div className="flex flex-col md:pr-3 md:flex-row gap-3 md:gap-1 items-center relative">
                    <p className="w-full md:w-1/2">
                        Step 1 - Select Departure Airport
                        <sup className="text-red-500">*</sup>
                    </p>
                    <div className="relative w-full md:w-1/2">
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

                                handleInputChange(
                                    "itinerary",
                                    "departureAirportComplete",
                                    airportCodeNameList.includes(e.target.value)
                                );

                                updateErrors(
                                    airportCodeNameList.includes(
                                        e.target.value
                                    ),
                                    "departureAirport",
                                    !airportCodeNameList.includes(
                                        e.target.value
                                    )
                                        ? "Please enter a valid departure airport."
                                        : ""
                                );
                            }}
                            value={formInputs.itinerary.departureAirport || ""}
                        />
                        {searchActive &&
                            !formInputs.itinerary.departureAirportComplete &&
                            fuzzySearchResults.length !== 0 && (
                                <div className="bg-red-50 w-full absolute z-10 border-2 border-primary border-t-0 flex flex-col">
                                    {fuzzySearchResults.map(
                                        (searchResult, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                    onClick={() => {
                                                        handleInputChange(
                                                            "itinerary",
                                                            "departureAirportComplete",
                                                            true
                                                        );
                                                        handleInputChange(
                                                            "itinerary",
                                                            "departureAirport",
                                                            `${searchResult.code} - ${searchResult.city}, ${searchResult.country}`
                                                        );

                                                        updateErrors(
                                                            true,
                                                            "departureAirport",
                                                            ""
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
                {errors.itinerary.departureAirport.message && (
                    <p className="text-red-500 text-xs pt-1 h-6 mt-1">
                        {errors.itinerary.departureAirport.message}
                    </p>
                )}
            </div>
            <div className="border-b-gray-200 border-b-2 py-3">
                <div className="flex flex-col md:pr-3 md:flex-row gap-3 md:gap-1 items-center relative">
                    <p className="w-full md:w-1/2">
                        Step 2 - Select Arrival Date
                        <sup className="text-red-500">*</sup>
                    </p>
                    <div className="w-full md:w-1/2 relative">
                        <input
                            type="text"
                            className={`w-full border-2 py-1 pl-2 focus:outline-none outline-none transition-all focus:border-primary
                        ${
                            formInputs.itinerary.departureDate &&
                            !isNaN(
                                new Date(
                                    formInputs.itinerary.departureDate
                                ).getTime()
                            )
                                ? "border-primary"
                                : "border-red-200"
                        }`}
                            placeholder="dd/mm/yyyy"
                            value={formInputs.itinerary.departureDate}
                            onChange={(e) => {
                                const rawInput = e.target.value;
                                let adjusted = null;

                                const isDeleting =
                                    prevDateInput.length > rawInput.length;

                                const formatted = formatDateString(
                                    rawInput,
                                    isDeleting
                                );
                                const slashCount = (
                                    formatted.match(/\//g) || []
                                ).length;

                                if (formatted.length >= 8 && slashCount === 2) {
                                    const normalized = normalizeDate(formatted);
                                    adjusted = adjustDate(
                                        normalized,
                                        minDate,
                                        maxDate
                                    );
                                    handleInputChange(
                                        "itinerary",
                                        "departureDate",
                                        adjusted
                                    );
                                } else {
                                    handleInputChange(
                                        "itinerary",
                                        "departureDate",
                                        formatted
                                    );
                                }

                                const inputCheck =
                                    validationSchemas.date.safeParse(
                                        adjusted || formatted
                                    );

                                updateErrors(
                                    inputCheck.success,
                                    "departureDate",
                                    !inputCheck.success
                                        ? inputCheck.error.issues[0].message
                                        : ""
                                );

                                setPrevDateInput(rawInput);
                            }}
                        />
                        <i className="fi fi-br-calendar-day absolute top-[10px] right-2 text-primary"></i>
                    </div>
                </div>
                {errors.itinerary.departureDate.message && (
                    <p className="text-red-500 text-xs pt-1 h-6 mt-1">
                        {errors.itinerary.departureDate.message}
                    </p>
                )}
            </div>

            <div className="border-b-gray-200 border-b-2 py-3 md:pr-3 flex flex-col md:flex-row gap-3 md:gap-1 items-center relative">
                <p className="w-full md:w-1/2">
                    Step 3 - Select Accommodation Type
                </p>
                <div className="w-full md:w-1/2 relative">
                    <select
                        className="w-full border-2 border-primary py-1 focus:outline-none pl-2"
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
                    <i className="fi fi-br-angle-down absolute top-[10px] right-2 text-primary"></i>
                </div>
            </div>

            <div className="border-b-gray-200 border-b-2 py-3 mr:pr-3 flex gap-3 md:gap-1 flex-col">
                <p className="w-full md:w-1/2">
                    Step 4 - Select Additional Activities
                </p>
                <div className="inline-flex flex-wrap mt-2 gap-3 md:pr-3">
                    {bookingContent.displayOptionalActivitiesByDay && (
                        <div className="flex flex-row gap-3 flex-wrap mb-4">
                            {generateDayLabels()}
                        </div>
                    )}
                    {bookingContent.optionalActivities
                        .filter(
                            (activity) =>
                                !bookingContent.displayOptionalActivitiesByDay ||
                                activity.day === selectedDay
                        )
                        .map((activity) => {
                            return (
                                <p
                                    key={activity.id}
                                    className={`inline-flex gap-2 max-w-fit border-2 rounded-2xl border-primary py-1 px-3 text-sm cursor-pointer md:text-nowrap transition-all ${
                                        formInputs.itinerary.optionalActivities.includes(
                                            activity.id
                                        )
                                            ? "bg-red-100"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let newActivitiesArray: number[] = [];
                                        if (
                                            formInputs.itinerary.optionalActivities.includes(
                                                activity.id
                                            )
                                        ) {
                                            newActivitiesArray =
                                                formInputs.itinerary.optionalActivities.filter(
                                                    (item) =>
                                                        item !== activity.id
                                                );
                                        } else {
                                            newActivitiesArray = [
                                                ...formInputs.itinerary
                                                    .optionalActivities,
                                                activity.id,
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
                        })}
                </div>
            </div>
        </div>
    );
};

export default BookingItinerary;
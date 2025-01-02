import { useEffect, useState } from "react";

import Itinerary_Booking from "./booking/Booking_Itinerary";
import Booking_Contact from "./booking/Booking_Contact";
import Booking_Payment from "./booking/Booking_Payment";
import Booking_Confirmation from "./booking/Booking_Confirmation";

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
    const [flightSurcharge, setFlightSurcharge] = useState<number>(0);
    const [roomSelection, setRoomSelection] = useState<string>(
        String(bookingContent.defaultHotel)
    );
    const [roomSurcharge, setRoomSurcharge] = useState<number>(0);
    const [optionalActivities, setOptionalActivities] = useState<number[]>([]);
    const [activitiesSurcharge, setActivitiesSurcharge] = useState<number>(0);

    const [departureDateError, setDepartureDateError] = useState<string>();

    const tourLength = Object.values(itineraryContent).length;

    const [currentBookingComponent, setCurrentBookingComponent] =
        useState<number>(0);

    const bookingComponents = [
        <Itinerary_Booking
            bookingContent={bookingContent}
            optionalActivities={optionalActivities}
            roomSelection={roomSelection}
            setDepartureDate={setDepartureDate}
            setRoomSelection={setRoomSelection}
            setOptionalActivities={setOptionalActivities}
        />,
        <Booking_Contact />,
        <Booking_Payment />,
        <Booking_Confirmation />,
    ];

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
    }, [optionalActivities]);

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
                <div className="flex flex-grow flex-col gap-3">
                    <p className="font-lobster text-3xl mb-3 text-primary">
                        Booking
                    </p>
                    {currentBookingComponent !== 3 && (
                        <div className="flex gap-3 w-1/2 items-center">
                            <div
                                className={`text-primary transition-all ${
                                    currentBookingComponent === 0
                                        ? "font-bold"
                                        : ""
                                }`}
                            >
                                Itinerary
                            </div>
                            <div
                                className={`flex-grow h-1 rounded-full transition-all ${
                                    currentBookingComponent >= 1
                                        ? "bg-primary"
                                        : "bg-gray-300"
                                }`}
                            ></div>
                            <div
                                className={`transition-all ${
                                    currentBookingComponent >= 1
                                        ? "text-primary"
                                        : "text-gray-300"
                                } ${
                                    currentBookingComponent === 1
                                        ? "font-bold"
                                        : ""
                                }`}
                            >
                                Contact Info
                            </div>
                            <div
                                className={`flex-grow h-1 rounded-full transition-all ${
                                    currentBookingComponent === 2
                                        ? "bg-primary"
                                        : "bg-gray-300"
                                }`}
                            ></div>
                            <div
                                className={`transition-all ${
                                    currentBookingComponent === 2
                                        ? "text-primary font-bold"
                                        : "text-gray-300"
                                }`}
                            >
                                Payment
                            </div>
                        </div>
                    )}
                    {bookingComponents[currentBookingComponent]}
                    {currentBookingComponent !== 3 && (
                        <>
                            <span className="flex-grow"></span>
                            <div className="flex justify-end gap-6 items-center pr-6">
                                {currentBookingComponent > 0 && (
                                    <p
                                        className="py-2 text-gray-500 hover:text-primary transition-all hover:underline cursor-pointer"
                                        onClick={() =>
                                            setCurrentBookingComponent(
                                                (currentBookingComponent) =>
                                                    (currentBookingComponent -
                                                        1 +
                                                        bookingComponents.length) %
                                                    bookingComponents.length
                                            )
                                        }
                                    >
                                        Previous
                                    </p>
                                )}

                                <p
                                    className="px-6 py-2 bg-primary hover:bg-primaryOff transition-all rounded-lg text-white cursor-pointer"
                                    onClick={() => {
                                        setCurrentBookingComponent(
                                            (currentBookingComponent) =>
                                                (currentBookingComponent +
                                                    1 +
                                                    bookingComponents.length) %
                                                bookingComponents.length
                                        );
                                    }}
                                >
                                    {currentBookingComponent === 2
                                        ? "Make Payment"
                                        : "Next"}
                                </p>
                            </div>
                        </>
                    )}
                </div>
                {currentBookingComponent !== 3 && (
                    <div className="w-1/3 flex-none border-l-2 border-gray-200 pl-6 flex flex-col gap-3">
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
                                                                (tourLength -
                                                                    1) *
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
                                    {formatDollarAmount(
                                        bookingContent.basePrice
                                    )}
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
                                        +{" "}
                                        {formatDollarAmount(
                                            activitiesSurcharge
                                        )}
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
                )}
            </div>
        </div>
    );
};

export default Booking;

import { useEffect, useState } from "react";

import Itinerary_Booking from "./booking/Itinerary_Booking";

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

    const tourLength = Object.values(itineraryContent).length;

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
                    <Itinerary_Booking
                        bookingContent={bookingContent}
                        optionalActivities={optionalActivities}
                        roomSelection={roomSelection}
                        setDepartureDate={setDepartureDate}
                        setRoomSelection={setRoomSelection}
                        setOptionalActivities={setOptionalActivities}
                    />
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

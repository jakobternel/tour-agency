import { useEffect, useState } from "react";

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
    };
}> = ({ itineraryContent, bookingContent }) => {
    const [departureDate, setDepartureDate] = useState<Date | null>();
    const [flightSurcharge, setFlightSurcharge] = useState<number>(0);
    const [roomSelection, setRoomSelection] = useState<string>(
        String(bookingContent.defaultHotel)
    );
    const [roomSurcharge, setRoomSurcharge] = useState<number>(0);
    const [tourLength] = useState<number>(
        Object.values(itineraryContent).length
    );

    useEffect(() => {
        setRoomSurcharge(
            bookingContent.hotelContent[roomSelection].dailyAdditionalPrice *
                (tourLength - 1)
        );
    }, [roomSelection]);

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
                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center">
                            <p className="w-1/2">
                                Step 1 - Select Departure Airport
                            </p>
                            <input
                                type="text"
                                className="w-1/2 border-2 border-primary p-1 focus:outline-none"
                            />
                        </div>
                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center">
                            <p className="w-1/2">
                                Step 2 - Select Arrival Dates
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
                        </div>

                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center">
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
                        </div>

                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex gap-1 items-center">
                            <p className="w-1/2">
                                Step 4 - Select Additional Activities
                            </p>
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
                                        {flightSurcharge >= 1 && (
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
                    <div>
                        <p className="font-montserrat font-semibold mb-1">
                            Activities
                        </p>
                        <div className="ml-3">
                            <div className="flex flex-row justify-between">
                                <p className="font-montserrat">Test</p>
                                <p className="text-gray-500 font-mono">
                                    + $100
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex justify-between">
                        <p className="font-montserrat font-semibold">
                            Total Price:
                        </p>
                        <p className="font-mono font-bold">
                            {formatDollarAmount(
                                bookingContent.basePrice +
                                    flightSurcharge +
                                    roomSurcharge
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;

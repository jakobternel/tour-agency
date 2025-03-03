import { useEffect, useState } from "react";
import { FormInputType } from "../../types/FormInput";
import { BookingContent, ItineraryContent } from "../../types/InputData";

const BookingDetails: React.FC<{
    itineraryContent: ItineraryContent;
    bookingContent: BookingContent;
    formInputs: FormInputType;
    currentBookingComponent: number;
}> = ({
    itineraryContent,
    bookingContent,
    formInputs,
    currentBookingComponent,
}) => {
    const [flightSurcharge, setFlightSurcharge] = useState<number>(0);

    const [roomSurcharge, setRoomSurcharge] = useState<number>(0);
    const [activitiesSurcharge, setActivitiesSurcharge] = useState<number>(0);

    const tourLength = Object.values(itineraryContent).length;

    const handleDateInput = () => {
        const [day, month, year] =
            formInputs.itinerary.departureDate.split("/");

        if (day && month && year && year.length == 4) {
            return `${year}-${month}-${day}`;
        } else {
            return;
        }
    };

    useEffect(() => {
        setRoomSurcharge(
            bookingContent.hotelContent[formInputs.itinerary.roomSelection]
                .dailyAdditionalPrice *
                (tourLength - 1)
        );
    }, [formInputs.itinerary.roomSelection]);

    useEffect(() => {
        let activitiesTotal = 0;

        formInputs.itinerary.optionalActivities.forEach((activityIndex) => {
            activitiesTotal +=
                bookingContent.optionalActivities[activityIndex].cost;
        });

        setActivitiesSurcharge(activitiesTotal);
    }, [formInputs.itinerary.optionalActivities]);

    const formatDollarAmount = (amount: number) => {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            {currentBookingComponent !== 3 && (
                <div className="w-1/3 flex-none border-l-2 border-gray-200 pl-6 flex flex-col gap-3">
                    {handleDateInput() !== undefined && (
                        <div>
                            <>
                                <p className="font-montserrat font-semibold mb-1">
                                    Trip Dates
                                </p>
                                <div className="ml-3">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-montserrat">Start</p>
                                        <p className="text-gray-500 font-mono">
                                            {String(
                                                new Date(
                                                    handleDateInput() as string
                                                ).toLocaleDateString("en-GB")
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className="font-montserrat">End</p>
                                        <p className="text-gray-500 font-mono">
                                            {String(
                                                new Date(
                                                    new Date(
                                                        handleDateInput() as string
                                                    ).getTime() +
                                                        (tourLength - 1) *
                                                            24 *
                                                            60 *
                                                            60 *
                                                            1000
                                                ).toLocaleDateString("en-GB")
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
                        </div>
                    )}

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
                                            formInputs.itinerary.roomSelection
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
                                {formInputs.itinerary.optionalActivities.map(
                                    (activity) => {
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
                                                <p className="text-gray-500 font-mono text-nowrap">
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
                                    }
                                )}
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
        </>
    );
};

export default BookingDetails;

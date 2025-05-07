import { useEffect, useState } from "react";
import { FormInputType } from "../../types/FormInput";
import { BookingContent, ItineraryContent } from "../../types/InputData";

const BookingDetails: React.FC<{
    itineraryContent: ItineraryContent;
    bookingContent: BookingContent;
    formInputs: FormInputType;
    currentBookingComponent: number;
    handleDateInput: (dateInput: string) => string;
    flightSurcharge: number;
    isMobile: boolean;
}> = ({
    itineraryContent,
    bookingContent,
    formInputs,
    currentBookingComponent,
    handleDateInput,
    flightSurcharge,
    isMobile,
}) => {
    const [roomSurcharge, setRoomSurcharge] = useState<number>(0);
    const [activitiesSurcharge, setActivitiesSurcharge] = useState<number>(0);
    const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);

    const tourLength = Object.values(itineraryContent.itinerary).length;

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
                <div className="flex-none md:border-l-2 md:border-gray-200 md:pl-6 px-6 py-4 flex flex-col gap-3 h-full">
                    <div
                        className={`flex md:hidden justify-between border-gray-200 md:border-none md:pb-0 ${
                            mobileExpanded ? "border-b-2 pb-4" : ""
                        }`}
                        onClick={() =>
                            setMobileExpanded(
                                (mobileExpanded) => !mobileExpanded
                            )
                        }
                    >
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
                    {(mobileExpanded || !isMobile) && (
                        <>
                            {handleDateInput(
                                formInputs.itinerary.departureDate
                            ) && (
                                <div>
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
                                                        new Date(
                                                            handleDateInput(
                                                                formInputs
                                                                    .itinerary
                                                                    .departureDate
                                                            )
                                                        ).toLocaleDateString(
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
                                                            new Date(
                                                                handleDateInput(
                                                                    formInputs
                                                                        .itinerary
                                                                        .departureDate
                                                                )
                                                            ).getTime() +
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
                                </div>
                            )}

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
                                                    formInputs.itinerary
                                                        .roomSelection
                                                ].name
                                            }
                                        </p>
                                        <p className="text-gray-500 font-mono">
                                            +{" "}
                                            {formatDollarAmount(roomSurcharge)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {formInputs.itinerary.optionalActivities.length >
                                0 && (
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
                            <div className="hidden md:flex-grow"></div>
                            <div className="justify-between hidden md:flex">
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
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default BookingDetails;

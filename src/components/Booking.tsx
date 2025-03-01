import { useState } from "react";

import ItineraryBooking from "./booking/BookingItinerary";
import BookingContact from "./booking/BookingContact";
import BookingPayment from "./booking/BookingPayment";
import BookingConfirmation from "./booking/BookingConfirmation";
import BookingDetails from "./booking/BookingDetails";

import { FormInputType } from "../types/FormInput";
import { BookingContent, ItineraryContent } from "../types/InputData";

const Booking: React.FC<{
    itineraryContent: ItineraryContent;
    bookingContent: BookingContent;
    bookingRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ itineraryContent, bookingContent, bookingRef }) => {
    const [formInputs, setFormInputs] = useState<FormInputType>({
        itinerary: {
            departureDate: undefined,
            departureAirport: undefined,
            roomSelection: String(bookingContent.defaultHotel),
            optionalActivities: [],
        },
        contact: {
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            emailConfirm: undefined,
            countryCode: undefined,
            phoneNumber: undefined,
            country: undefined,
            specialRequests: undefined,
        },
        payment: {
            email: undefined,
            phoneNumber: undefined,
            addressLine1: undefined,
            addressLine2: undefined,
            postcode: undefined,
            city: undefined,
            country: undefined,
            state: undefined,
            cardNo: undefined,
            cardholder: undefined,
            expiry: undefined,
            cvc: undefined,
            consent: false,
        },
    });

    const [currentBookingComponent, setCurrentBookingComponent] =
        useState<number>(0);

    const handleInputChange = <T extends keyof FormInputType>(
        section: T,
        field: keyof FormInputType[T],
        value: FormInputType[T][keyof FormInputType[T]]
    ) => {
        setFormInputs((prevInputs: FormInputType) => ({
            ...prevInputs,
            [section]: {
                ...prevInputs[section],
                [field]: value,
            },
        }));
    };

    const bookingComponents = [
        <ItineraryBooking
            formInputs={formInputs}
            handleInputChange={handleInputChange}
            bookingContent={bookingContent}
        />,
        <BookingContact
            formInputs={formInputs}
            handleInputChange={handleInputChange}
        />,
        <BookingPayment
            formInputs={formInputs}
            handleInputChange={handleInputChange}
        />,
        <BookingConfirmation />,
    ];

    return (
        <div
            className="bg-primary w-full h-full py-20 flex justify-center"
            ref={bookingRef}
        >
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
                <BookingDetails
                    itineraryContent={itineraryContent}
                    bookingContent={bookingContent}
                    formInputs={formInputs}
                    currentBookingComponent={currentBookingComponent}
                />
            </div>
        </div>
    );
};

export default Booking;

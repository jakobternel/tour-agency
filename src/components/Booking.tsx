import { useEffect, useState } from "react";

import ItineraryBooking from "./booking/BookingItinerary";
import BookingContact from "./booking/BookingContact";
import BookingPayment from "./booking/BookingPayment";
import BookingConfirmation from "./booking/BookingConfirmation";
import BookingDetails from "./booking/BookingDetails";

import { FormInputType } from "../types/FormInput";
import { BookingContent, ItineraryContent } from "../types/InputData";
import { APIResultsType } from "../types/ApiResults";
import { getTotalFlightCost } from "../utils/flightCost";
import { getAirportCodeList } from "../utils/airportSearch";
import {
    defaultFormErrors,
    defaultFormInput,
} from "../utils/bookingFormDefaults";
import {
    ErrorTypes,
    ItineraryKeys,
    ContactKeys,
    PaymentKeys,
} from "../types/FormValidation";

type BookingKey = "itinerary" | "contact" | "payment";
const bookingKeys: BookingKey[] = ["itinerary", "contact", "payment"];

const Booking: React.FC<{
    itineraryContent: ItineraryContent;
    bookingContent: BookingContent;
    bookingRef: React.MutableRefObject<HTMLDivElement | null>;
    apiResults: APIResultsType;
    setApiResults: React.Dispatch<React.SetStateAction<APIResultsType>>;
    arrAirport: string;
    isMobile: boolean;
}> = ({
    itineraryContent,
    bookingContent,
    bookingRef,
    apiResults,
    setApiResults,
    arrAirport,
    isMobile,
}) => {
    const [formInputs, setFormInputs] =
        useState<FormInputType>(defaultFormInput);

    const [currentBookingComponent, setCurrentBookingComponent] =
        useState<number>(0);
    const [flightSurcharge, setFlightSurcharge] = useState<number>(0);
    const [airportList, setAirportList] = useState<string[]>([]);
    const [completedBookingSections, setCompletedBookingSections] = useState<
        number[]
    >([]);
    const [errors, setErrors] = useState<ErrorTypes>(defaultFormErrors);
    const [errorCount, setErrorCount] = useState<Record<BookingKey, number>>({
        itinerary: 1,
        contact: 1,
        payment: 1,
    });

    const handleErrorChange = (
        section: keyof ErrorTypes,
        fieldCode: ItineraryKeys | ContactKeys | PaymentKeys,
        error: boolean,
        message: string
    ) => {
        setErrors((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [fieldCode]: {
                    withoutError: error,
                    message: message,
                },
            },
        }));
    };

    const handleDateInput = (dateInput: string) => {
        const [day, month, year] = dateInput.split("/");

        if (day && month && year && year.length === 4) {
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        } else {
            return "";
        }
    };

    const confirmFormInputsFilled = (page: number) => {
        if (page === 0) {
            if (
                !formInputs.itinerary.departureAirport ||
                !formInputs.itinerary.departureDate ||
                !formInputs.itinerary.departureAirportComplete
            ) {
                return false;
            } else {
                return true;
            }
        }

        if (page === 1) {
            if (
                !formInputs.contact.firstName ||
                !formInputs.contact.lastName ||
                !formInputs.contact.phoneNumber ||
                !formInputs.contact.email ||
                !formInputs.contact.emailConfirm ||
                !formInputs.contact.country
            ) {
                return false;
            } else {
                return true;
            }
        }

        if (page === 2) {
            if (
                [0, 1, 2].some(
                    (section) => !completedBookingSections.includes(section)
                )
            ) {
                return false;
            } else {
                return true;
            }
        }

        return false;
    };

    useEffect(() => {
        setFormInputs(defaultFormInput);
        setFormInputs((prev) => ({
            ...prev,
            itinerary: {
                ...prev.itinerary,
                roomSelection: String(bookingContent.defaultHotel),
            },
        }));
        setCurrentBookingComponent(0);
    }, [bookingContent]);

    useEffect(() => {
        Object.keys(errors).forEach((bookingPage) => {
            const section = bookingPage as keyof ErrorTypes;

            let errorCount = 0;

            Object.values(errors[section]).forEach((field) => {
                if (!field.withoutError) {
                    errorCount++;
                }
            });

            setErrorCount((prev) => ({
                ...prev,
                [bookingPage]: errorCount,
            }));
        });
    }, [errors]);

    useEffect(() => {
        const getAirportCodes = async () => {
            const codes = await getAirportCodeList();
            setAirportList(codes);
        };

        getAirportCodes();
    }, []);

    useEffect(() => {
        setFlightSurcharge(0);

        const departureDate = handleDateInput(
            formInputs.itinerary.departureDate
        );
        const departureAirport =
            formInputs.itinerary.departureAirport?.split(" - ")[0];

        if (
            !departureAirport ||
            !departureDate ||
            !airportList.includes(departureAirport) ||
            !formInputs.itinerary.departureAirportComplete
        ) {
            return;
        }

        const existingPrice =
            apiResults.flights?.[arrAirport]?.[departureAirport]?.[
                departureDate
            ];

        if (existingPrice) {
            setFlightSurcharge(existingPrice);
            return;
        }

        const getFlightData = async () => {
            // handleErrorChange("itinerary", "flightPriceLoading", false, "");

            try {
                const flightData = await getTotalFlightCost(
                    departureAirport,
                    arrAirport,
                    departureDate,
                    Object.keys(itineraryContent).length,
                    true
                );

                if (flightData && flightData.length > 0) {
                    let flightTotal = 0;

                    flightData.forEach((route) => {
                        flightTotal += Number(route.price.grandTotal);
                    });

                    setFlightSurcharge(flightTotal);

                    setApiResults((prevResults: any) => ({
                        ...prevResults,
                        flights: {
                            ...prevResults.flights,
                            [arrAirport]: {
                                ...prevResults.flights[arrAirport],
                                [departureAirport]: {
                                    ...prevResults.flights[arrAirport]?.[
                                        departureAirport
                                    ],
                                    [departureDate]: flightTotal,
                                },
                            },
                        },
                    }));
                }

                handleErrorChange("itinerary", "flightPriceLoading", true, "");
            } catch (error) {
                console.error("Error fetching flight data:", error);
                handleErrorChange("itinerary", "flightPriceLoading", true, "");
            }
        };

        getFlightData();
    }, [
        formInputs.itinerary.departureAirport,
        formInputs.itinerary.departureDate,
        formInputs.itinerary.departureAirportComplete,
    ]);

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
            updateErrors={(
                withoutError: boolean,
                fieldCode: string,
                message: string
            ): void => {
                handleErrorChange(
                    "itinerary",
                    fieldCode as ItineraryKeys,
                    withoutError,
                    message
                );
            }}
            errors={errors}
        />,
        <BookingContact
            formInputs={formInputs}
            handleInputChange={handleInputChange}
            updateErrors={(
                withoutError: boolean,
                fieldCode: string,
                message: string
            ): void => {
                handleErrorChange(
                    "contact",
                    fieldCode as ContactKeys,
                    withoutError,
                    message
                );
            }}
            errors={errors}
        />,
        <BookingPayment
            formInputs={formInputs}
            handleInputChange={handleInputChange}
            completedBookingSections={completedBookingSections}
            setCompletedBookingSections={setCompletedBookingSections}
            updateErrors={(
                withoutError: boolean,
                fieldCode: string,
                message: string
            ): void => {
                handleErrorChange(
                    "payment",
                    fieldCode as PaymentKeys,
                    withoutError,
                    message
                );
            }}
            errors={errors}
        />,
        <BookingConfirmation />,
    ];

    return (
        <div
            className="bg-primary w-full h-full md:py-20 p-7 md:px-0 flex justify-center"
            ref={bookingRef}
        >
            <div className="md:shadow-xl w-full md:w-3/4 flex flex-col md:flex-row">
                <div className="bg-white p-5 rounded-xl md:rounded-r-none shadow-xl md:shadow-none md:pr-0 md:py-10 md:pl-10 md:w-2/3 flex flex-grow flex-col gap-3">
                    <p className="font-lobster text-3xl mb-3 text-primary">
                        Booking
                    </p>
                    {currentBookingComponent !== 3 && (
                        <div className="flex gap-3 w-full md:w-1/2 justify-between md:justify-normal items-center">
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
                                className={`hidden md:block flex-grow h-1 rounded-full transition-all ${
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
                                className={`hidden md:block flex-grow h-1 rounded-full transition-all ${
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
                            <div className="flex justify-between md:justify-end gap-6 items-center md:pr-6">
                                {currentBookingComponent > 0 ? (
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
                                ) : (
                                    <div></div>
                                )}

                                <p
                                    className={`px-6 py-2 transition-all rounded-lg text-white ${
                                        errorCount[
                                            bookingKeys[currentBookingComponent]
                                        ] > 0
                                            ? "bg-gray-300 cursor-default"
                                            : "bg-primary hover:bg-primaryOff cursor-pointer"
                                    }`}
                                    onClick={() => {
                                        if (
                                            confirmFormInputsFilled(
                                                currentBookingComponent
                                            )
                                        ) {
                                            setCurrentBookingComponent(
                                                (currentBookingComponent) =>
                                                    (currentBookingComponent +
                                                        1 +
                                                        bookingComponents.length) %
                                                    bookingComponents.length
                                            );
                                        }
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
                <div className="md:hidden block h-6"></div>
                {currentBookingComponent !== 3 && (
                    <div className="md:w-1/3 bg-white md:rounded-r-xl md:pr-6 md:py-10 md:pl-0 md:h-full shadow-xl md:shadow-none rounded-xl md:rounded-none">
                        <BookingDetails
                            itineraryContent={itineraryContent}
                            bookingContent={bookingContent}
                            formInputs={formInputs}
                            currentBookingComponent={currentBookingComponent}
                            handleDateInput={handleDateInput}
                            flightSurcharge={flightSurcharge}
                            isMobile={isMobile}
                            isFlightLoading={
                                !errors.itinerary.flightPriceLoading
                                    .withoutError
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;

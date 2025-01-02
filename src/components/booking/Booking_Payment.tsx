import { useState } from "react";
import { Country, State } from "country-state-city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faCcAmex,
    faCcDinersClub,
    faCcDiscover,
    faCcJcb,
    faCcMastercard,
    faCcVisa,
} from "@fortawesome/free-brands-svg-icons";

const Booking_Payment: React.FC = () => {
    const [openPaymentSection, setOpenPaymentSection] = useState<number | null>(
        0
    );
    const [completedSections, setCompletedSections] = useState<number[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
    const [cardType, setCardType] = useState<
        | "visa"
        | "mastercard"
        | "amex"
        | "jcb"
        | "diners"
        | "discover"
        | "default"
    >("default");
    const [cardNumberInput, setCardNumberInput] = useState<string>("");
    const [cardCVCInput, setCardCVCInput] = useState<string>("");

    const handleCardNumberInput = (input: string) => {
        const digits = input.replace(/\D+/g, "");

        let detectedCardType: keyof typeof cardTypes | "default" = "default";

        for (const [type, card] of Object.entries(cardTypes)) {
            if (card.regex.test(digits)) {
                detectedCardType = type as keyof typeof cardTypes;
                break;
            }
        }
        setCardType(detectedCardType);

        if (
            detectedCardType !== "default" &&
            digits.length <= cardTypes[detectedCardType].maxDigits
        ) {
            setCardNumberInput(digits);
        } else if (detectedCardType === "default") {
            setCardNumberInput(digits);
        }
    };

    const cardTypes = {
        visa: {
            regex: new RegExp(/^4\d{0,3}/),
            icon: faCcVisa,
            maxDigits: 19,
        },
        mastercard: {
            regex: new RegExp(
                /^(5[1-5]\d{0,3}|222[1-9]\d{0,2}|22[3-9]\d{0,3}|2[3-6]\d{0,4}|27[01]\d{0,3}|2720\d{0,2})/
            ),
            icon: faCcMastercard,
            maxDigits: 16,
        },
        amex: {
            regex: new RegExp(/^3[47]\d{0,3}/),
            icon: faCcAmex,
            maxDigits: 15,
        },
        jcb: {
            regex: new RegExp(/^35(?:2[89]|[3-8]\d)\d{0,3}/),
            icon: faCcJcb,
            maxDigits: 19,
        },
        diners: {
            regex: new RegExp(/^3(?:0[0-5]|[68]\d)\d{0,3}/),
            icon: faCcDinersClub,
            maxDigits: 16,
        },
        discover: {
            regex: new RegExp(/^6(?:011|5\d{0,2}|4[4-9]\d|22[1-9]\d{0,1})/),
            icon: faCcDiscover,
            maxDigits: 19,
        },
    };

    return (
        <div className="pr-6 py-3 flex flex-col gap-3">
            <div className="flex flex-col border-2 rounded-md border-primary transition-all">
                <div
                    className="flex flex-row gap-3 items-center size-full p-3 cursor-pointer"
                    onClick={() => setOpenPaymentSection(0)}
                >
                    <div
                        className={`border-primary rounded-full border-2 size-5 flex items-center justify-center transition-all
                ${completedSections.includes(0) && "bg-primary"}`}
                    >
                        <i
                            className={`fi fi-br-check text-white text-xs transition-all opacity-0 ${
                                completedSections.includes(0) && "opacity-100"
                            }`}
                        ></i>
                    </div>
                    <div>Contact Information</div>
                </div>
                <div
                    className={`transition-all overflow-clip ${
                        openPaymentSection === 0 ? "max-h-[1000px]" : "max-h-0"
                    }`}
                >
                    <div className="p-3 pt-0">
                        <div className="flex flex-row gap-3 justify-between">
                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Email Address</p>
                                <input
                                    type="email"
                                    className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow"
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Phone Number</p>
                                <input
                                    type="tel"
                                    className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (!completedSections.includes(0)) {
                                    setCompletedSections(
                                        (completedSections) => [
                                            ...completedSections,
                                            0,
                                        ]
                                    );
                                }

                                if (!completedSections.includes(1)) {
                                    setOpenPaymentSection(1);
                                } else {
                                    setOpenPaymentSection(null);
                                }
                            }}
                            className="border-2 border-primary rounded-lg text-sm px-3 py-2 transition-all hover:bg-red-100 mt-6"
                        >
                            Confirm Details
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col border-2 rounded-md border-primary transition-all">
                <div
                    className="flex flex-row gap-3 items-center size-full p-3 cursor-pointer"
                    onClick={() => setOpenPaymentSection(1)}
                >
                    <div
                        className={`border-primary rounded-full border-2 size-5 flex items-center justify-center transition-all
                            ${completedSections.includes(1) && "bg-primary"}`}
                    >
                        <i
                            className={`fi fi-br-check text-white text-xs transition-all opacity-0 ${
                                completedSections.includes(1) && "opacity-100"
                            }`}
                        ></i>
                    </div>
                    <div>Billing Address</div>
                </div>
                <div
                    className={`transition-all overflow-clip ${
                        openPaymentSection === 1 ? "max-h-[1000px]" : "max-h-0"
                    }`}
                >
                    <div className="p-3 pt-0">
                        <div className="flex flex-row flex-wrap gap-3 justify-between">
                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Address Line 1</p>
                                <input
                                    type="text"
                                    className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow"
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Address Line 2</p>
                                <input
                                    type="text"
                                    className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow"
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Postcode</p>
                                <input
                                    type="text"
                                    className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow"
                                />
                            </div>
                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>City</p>
                                <input
                                    type="text"
                                    className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow"
                                />
                            </div>
                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Country</p>
                                <div className="relative">
                                    <select
                                        className="border-2 border-red-200 py-1 pl-2 focus:outline-none w-full"
                                        defaultValue="select"
                                        onChange={(e) => {
                                            setSelectedCountry(
                                                e.target.value.split("-")
                                            );
                                        }}
                                    >
                                        <option value="select" disabled={true}>
                                            Select Country
                                        </option>
                                        {Country.getAllCountries().map(
                                            (country) => {
                                                return (
                                                    <option
                                                        key={country.isoCode}
                                                        value={`${country.isoCode}-${country.name}`}
                                                    >
                                                        {country.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <i className="fi fi-br-angle-down absolute right-2 top-1/2 -translate-y-1/2 text-primary"></i>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>State/Province</p>
                                <div className="relative">
                                    <select
                                        className="border-2 border-red-200 py-1 pl-2 focus:outline-none w-full"
                                        defaultValue="select"
                                    >
                                        <option value="select" disabled={true}>
                                            Select State
                                        </option>
                                        {selectedCountry[0] &&
                                            State.getStatesOfCountry(
                                                selectedCountry[0]
                                            ).map((state) => {
                                                return (
                                                    <option
                                                        key={state.isoCode}
                                                        value={state.isoCode}
                                                    >
                                                        {state.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <i className="fi fi-br-angle-down absolute right-2 top-1/2 -translate-y-1/2 text-primary"></i>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (!completedSections.includes(1)) {
                                    setCompletedSections(
                                        (completedSections) => [
                                            ...completedSections,
                                            1,
                                        ]
                                    );
                                }

                                if (!completedSections.includes(2)) {
                                    setOpenPaymentSection(2);
                                } else {
                                    setOpenPaymentSection(null);
                                }
                            }}
                            className="border-2 border-primary rounded-lg text-sm px-3 py-2 transition-all hover:bg-red-100 mt-6"
                        >
                            Confirm Details
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-2 rounded-md border-primary transition-all">
                <div
                    className="flex flex-row gap-3 items-center size-full p-3 cursor-pointer"
                    onClick={() => setOpenPaymentSection(2)}
                >
                    <div
                        className={`border-primary rounded-full border-2 size-5 flex items-center justify-center transition-all
                ${completedSections.includes(2) && "bg-primary"}`}
                    >
                        <i
                            className={`fi fi-br-check text-white text-xs transition-all opacity-0 ${
                                completedSections.includes(2) && "opacity-100"
                            }`}
                        ></i>
                    </div>
                    <div>Payment Details</div>
                </div>
                <div
                    className={`transition-all overflow-clip ${
                        openPaymentSection === 2 ? "max-h-[1000px]" : "max-h-0"
                    }`}
                >
                    <div className="p-3 pt-0">
                        <div className="flex flex-row gap-3 flex-wrap">
                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Card Number</p>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis w-full"
                                        placeholder="4000 0000 0000 0000"
                                        value={
                                            cardNumberInput
                                                ? cardNumberInput
                                                      .replace(
                                                          /(\d{4})(?=\d)/g,
                                                          "$1 "
                                                      )
                                                      .trim()
                                                : ""
                                        }
                                        onChange={(e) => {
                                            handleCardNumberInput(
                                                e.target.value
                                            );
                                        }}
                                    />
                                    {cardType === "default" ? (
                                        <i className="fi fi-sr-credit-card absolute right-2 top-1/2 -translate-y-1/2 text-primary"></i>
                                    ) : (
                                        <FontAwesomeIcon
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
                                            icon={
                                                cardTypes[
                                                    cardType as keyof typeof cardTypes
                                                ].icon
                                            }
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Cardholder's Name</p>
                                <input
                                    type="text"
                                    placeholder="John Smith"
                                    className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis"
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-1/5">
                                <p>Expiry Date</p>
                                <input
                                    type="text"
                                    placeholder="01/2027"
                                    className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow"
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-1/5">
                                <div className="flex flex-row justify-between items-center">
                                    <p>CVC</p>
                                    <div className="relative">
                                        <i className="peer fi fi-rr-question-square cursor-pointer"></i>
                                        <div className="peer-hover:opacity-100 opacity-0 transition-all absolute top-1/2 -translate-y-1/2 left-[calc(100%+0.5em)] w-72 bg-gray-200 rounded-lg border-2 border-black p-2">
                                            <p className="text-xs">
                                                The 3-digit security code
                                                located on the back of your
                                                card. For American Express
                                                cards, this is a 4-digit code on
                                                the front.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder={
                                        cardType === "amex" ? "0000" : "000"
                                    }
                                    className="border-2 border-red-200 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow"
                                    value={cardCVCInput}
                                    onChange={(e) => {
                                        const digits = e.target.value.replace(
                                            /\D+/g,
                                            ""
                                        );

                                        if (
                                            (cardType === "amex" &&
                                                digits.length <= 4) ||
                                            (cardType !== "amex" &&
                                                digits.length <= 3)
                                        ) {
                                            setCardCVCInput(digits);
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-row gap-1 items-center w-full">
                                <input
                                    type="checkbox"
                                    name="consent"
                                    id="consent"
                                />
                                <label htmlFor="consent" className="text-sm">
                                    I consent to the processing of my payment
                                    and card details.
                                </label>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (!completedSections.includes(2)) {
                                    setCompletedSections(
                                        (completedSections) => [
                                            ...completedSections,
                                            2,
                                        ]
                                    );
                                }

                                setOpenPaymentSection(null);
                            }}
                            className="border-2 border-primary rounded-lg text-sm px-3 py-2 transition-all hover:bg-red-100 mt-6"
                        >
                            Confirm Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking_Payment;

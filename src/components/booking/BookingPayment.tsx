import { useEffect, useState } from "react";
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

import { FormInputType } from "../../types/FormInput";

const BookingPayment: React.FC<{
    formInputs: FormInputType;
    handleInputChange: <T extends keyof FormInputType>(
        section: T,
        field: keyof FormInputType[T],
        value: FormInputType[T][keyof FormInputType[T]]
    ) => void;
    completedBookingSections: number[];
    setCompletedBookingSections: React.Dispatch<React.SetStateAction<number[]>>;
}> = ({
    formInputs,
    handleInputChange,
    completedBookingSections,
    setCompletedBookingSections,
}) => {
    const [openPaymentSection, setOpenPaymentSection] = useState<number | null>(
        0
    );
    const [cardType, setCardType] = useState<
        | "visa"
        | "mastercard"
        | "amex"
        | "jcb"
        | "diners"
        | "discover"
        | "default"
    >("default");
    const [backspacePressed, setBackspacePressed] = useState<boolean>(false);

    const handleCardNumberInput = (input: string): string => {
        const digits: string = input.replace(/\D+/g, "");

        let detectedCardType: keyof typeof cardTypes | "default" = "default";

        for (const [type, card] of Object.entries(cardTypes)) {
            if (card.regex.test(digits)) {
                detectedCardType = type as keyof typeof cardTypes;
                break;
            }
        }
        setCardType(detectedCardType);

        if (detectedCardType !== "default") {
            return digits.slice(0, cardTypes[detectedCardType].maxDigits);
        } else {
            return digits;
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

    const confirmPaymentFieldsComplete = (section: number) => {
        const removeCompletedSectionFromArray = (element: number) => {
            setCompletedBookingSections((completedSections) =>
                completedSections.filter((item) => item !== element)
            );
        };

        if (section === 0) {
            if (!formInputs.payment.email || !formInputs.payment.phoneNumber) {
                removeCompletedSectionFromArray(0);
                return false;
            } else {
                return true;
            }
        }

        if (section === 1) {
            if (
                !formInputs.payment.addressLine1 ||
                !formInputs.payment.postcode ||
                !formInputs.payment.city ||
                !formInputs.payment.country ||
                !formInputs.payment.state
            ) {
                removeCompletedSectionFromArray(1);
                return false;
            } else {
                return true;
            }
        }

        if (section === 2) {
            if (
                !formInputs.payment.cardNo ||
                !formInputs.payment.cardholder ||
                !formInputs.payment.expiry ||
                !formInputs.payment.cvc ||
                !formInputs.payment.consent
            ) {
                removeCompletedSectionFromArray(2);
                return false;
            } else {
                return true;
            }
        }
    };

    useEffect(() => {
        if (formInputs.payment.email === undefined) {
            handleInputChange("payment", "email", formInputs.contact.email);
        }

        if (formInputs.payment.phoneNumber === undefined) {
            handleInputChange(
                "payment",
                "phoneNumber",
                formInputs.contact.phoneNumber
            );
        }
    }, [formInputs.contact.email, formInputs.contact.phoneNumber]);

    return (
        <div className="pr-6 py-3 flex flex-col gap-3">
            <div className="flex flex-col border-2 rounded-md border-primary transition-all">
                <div
                    className="flex flex-row gap-3 items-center size-full p-3 cursor-pointer"
                    onClick={() => setOpenPaymentSection(0)}
                >
                    <div
                        className={`border-primary rounded-full border-2 size-5 flex items-center justify-center transition-all
                ${completedBookingSections.includes(0) && "bg-primary"}`}
                    >
                        <i
                            className={`fi fi-br-check text-white text-xs transition-all opacity-0 ${
                                completedBookingSections.includes(0) &&
                                "opacity-100"
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
                                    value={formInputs.payment.email}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "payment",
                                            "email",
                                            e.target.value
                                        );
                                    }}
                                    type="email"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.email
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Phone Number</p>
                                <input
                                    value={formInputs.payment.phoneNumber}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "payment",
                                            "phoneNumber",
                                            e.target.value
                                        );
                                    }}
                                    type="tel"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.phoneNumber
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (confirmPaymentFieldsComplete(0)) {
                                    if (!completedBookingSections.includes(0)) {
                                        setCompletedBookingSections(
                                            (completedSections) => [
                                                ...completedSections,
                                                0,
                                            ]
                                        );
                                    }

                                    if (!completedBookingSections.includes(1)) {
                                        setOpenPaymentSection(1);
                                    } else {
                                        setOpenPaymentSection(null);
                                    }
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
                            ${
                                completedBookingSections.includes(1) &&
                                "bg-primary"
                            }`}
                    >
                        <i
                            className={`fi fi-br-check text-white text-xs transition-all opacity-0 ${
                                completedBookingSections.includes(1) &&
                                "opacity-100"
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
                                    value={formInputs.payment.addressLine1}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "payment",
                                            "addressLine1",
                                            e.target.value
                                        );
                                    }}
                                    type="text"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.addressLine1
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Address Line 2</p>
                                <input
                                    value={formInputs.payment.addressLine2}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "payment",
                                            "addressLine2",
                                            e.target.value
                                        );
                                    }}
                                    type="text"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.addressLine2
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Postcode</p>
                                <input
                                    value={formInputs.payment.postcode}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "payment",
                                            "postcode",
                                            e.target.value
                                        );
                                    }}
                                    type="text"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.postcode
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                            </div>
                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>City</p>
                                <input
                                    value={formInputs.payment.city}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "payment",
                                            "city",
                                            e.target.value
                                        );
                                    }}
                                    type="text"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.city
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                            </div>
                            <div className="flex flex-col gap-1 relative w-[calc(50%-6px)]">
                                <p>Country</p>
                                <div className="relative">
                                    <select
                                        className={`border-2 py-1 focus:outline-none pl-2 w-full outline-none transition-all focus:border-primary ${
                                            formInputs.payment.country
                                                ? "border-primary"
                                                : "border-red-200"
                                        }`}
                                        defaultValue={
                                            formInputs.payment.country
                                                ? formInputs.payment.country
                                                : "select"
                                        }
                                        onChange={(e) => {
                                            handleInputChange(
                                                "payment",
                                                "country",
                                                e.target.value
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
                                                        value={country.isoCode}
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
                                        className={`border-2 py-1 focus:outline-none pl-2 w-full outline-none transition-all focus:border-primary ${
                                            formInputs.payment.state
                                                ? "border-primary"
                                                : "border-red-200"
                                        }`}
                                        defaultValue={
                                            formInputs.payment.state
                                                ? formInputs.payment.state
                                                : "select"
                                        }
                                        onChange={(e) => {
                                            handleInputChange(
                                                "payment",
                                                "state",
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <option value="select" disabled={true}>
                                            Select State
                                        </option>
                                        {formInputs.payment.country &&
                                            State.getStatesOfCountry(
                                                formInputs.payment.country
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
                                if (confirmPaymentFieldsComplete(1)) {
                                    if (!completedBookingSections.includes(1)) {
                                        setCompletedBookingSections(
                                            (completedSections) => [
                                                ...completedSections,
                                                1,
                                            ]
                                        );
                                    }

                                    if (!completedBookingSections.includes(2)) {
                                        setOpenPaymentSection(2);
                                    } else {
                                        setOpenPaymentSection(null);
                                    }
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
                ${completedBookingSections.includes(2) && "bg-primary"}`}
                    >
                        <i
                            className={`fi fi-br-check text-white text-xs transition-all opacity-0 ${
                                completedBookingSections.includes(2) &&
                                "opacity-100"
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
                                        className={`border-2 py-1 focus:outline-none pl-2 w-full outline-none transition-all focus:border-primary ${
                                            formInputs.payment.cardNo
                                                ? "border-primary"
                                                : "border-red-200"
                                        }`}
                                        placeholder="4000 0000 0000 0000"
                                        value={
                                            formInputs.payment.cardNo
                                                ? formInputs.payment.cardNo
                                                      .replace(
                                                          /(\d{4})(?=\d)/g,
                                                          "$1 "
                                                      )
                                                      .trim()
                                                : ""
                                        }
                                        onChange={(e) => {
                                            handleInputChange(
                                                "payment",
                                                "cardNo",
                                                handleCardNumberInput(
                                                    e.target.value
                                                )
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
                                    value={formInputs.payment.cardholder}
                                    onChange={(e) => {
                                        handleInputChange(
                                            "payment",
                                            "cardholder",
                                            e.target.value
                                        );
                                    }}
                                    type="text"
                                    placeholder="John Smith"
                                    className={`border-2 py-1 focus:outline-none pl-2 w-full outline-none transition-all focus:border-primary ${
                                        formInputs.payment.cardholder
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(25%-9px)]">
                                <p>Expiry Date</p>
                                <input
                                    onKeyDown={(
                                        e: React.KeyboardEvent<HTMLInputElement>
                                    ) => {
                                        e.key === "Backspace"
                                            ? setBackspacePressed(true)
                                            : setBackspacePressed(false);
                                    }}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        let value = e.target.value.replace(
                                            /[^0-9/]/g,
                                            ""
                                        );
                                        const slashCount = (
                                            value.match(/\//g) || []
                                        ).length;

                                        if (slashCount > 1) {
                                            return;
                                        }

                                        if (
                                            value.length === 3 &&
                                            backspacePressed
                                        ) {
                                            value = value.slice(0, 2);
                                        }

                                        if (
                                            value.length >= 2 &&
                                            !backspacePressed &&
                                            !value.includes("/")
                                        ) {
                                            value = `${value.slice(
                                                0,
                                                2
                                            )}/${value.slice(2)}`;
                                        }

                                        if (value.length > 7) {
                                            value = value.slice(0, 7);
                                        }

                                        handleInputChange(
                                            "payment",
                                            "expiry",
                                            value
                                        );
                                    }}
                                    type="text"
                                    value={formInputs.payment.expiry}
                                    placeholder="01/2027"
                                    className={`border-2 py-1 focus:outline-none pl-2 w-full outline-none transition-all focus:border-primary ${
                                        formInputs.payment.expiry
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(25%-9px)]">
                                <div className="flex flex-row justify-between items-center">
                                    <p>CVC/CVV</p>
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
                                    className={`border-2 py-1 focus:outline-none pl-2 w-full outline-none transition-all focus:border-primary ${
                                        formInputs.payment.cvc
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                    value={formInputs.payment.cvc}
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
                                            handleInputChange(
                                                "payment",
                                                "cvc",
                                                digits
                                            );
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-row gap-1 items-center w-full">
                                <input
                                    onChange={() =>
                                        handleInputChange(
                                            "payment",
                                            "consent",
                                            !formInputs.payment.consent
                                        )
                                    }
                                    checked={formInputs.payment.consent}
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
                                if (confirmPaymentFieldsComplete(2)) {
                                    if (!completedBookingSections.includes(2)) {
                                        setCompletedBookingSections(
                                            (completedSections) => [
                                                ...completedSections,
                                                2,
                                            ]
                                        );
                                    }

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
        </div>
    );
};

export default BookingPayment;

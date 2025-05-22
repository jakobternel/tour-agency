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
import {
    ErrorTypes,
    PaymentKeys,
} from "../../types/FormValidation";
import { ZodEffects, ZodString } from "zod";

import { validationSchemas } from "../../utils/validation";

const BookingPayment: React.FC<{
    formInputs: FormInputType;
    handleInputChange: <T extends keyof FormInputType>(
        section: T,
        field: keyof FormInputType[T],
        value: FormInputType[T][keyof FormInputType[T]]
    ) => void;
    completedBookingSections: number[];
    setCompletedBookingSections: React.Dispatch<React.SetStateAction<number[]>>;
    updateErrors: (
        withoutError: boolean,
        fieldCode: string,
        message: string
    ) => void;
    errors: ErrorTypes;
}> = ({
    formInputs,
    handleInputChange,
    completedBookingSections,
    setCompletedBookingSections,
    updateErrors,
    errors,
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
            const countryHasStates = formInputs.payment.country
                ? State.getStatesOfCountry(formInputs.payment.country).length >
                  0
                : false;

            const isStateValid = countryHasStates
                ? !!formInputs.payment.state
                : true;

            if (
                !formInputs.payment.addressLine1 ||
                !formInputs.payment.postcode ||
                !formInputs.payment.city ||
                !formInputs.payment.country ||
                !isStateValid
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

    const handleBlur = (
        schema: ZodString | ZodEffects<any>,
        input: string,
        fieldCode: string
    ): void => {
        const inputCheck = schema.safeParse(input);
        let message = "";

        if (!inputCheck.success) {
            message = inputCheck.error.issues[0].message;
        }

        updateErrors(inputCheck.success, fieldCode, message);
    };

    useEffect(() => {
        if (formInputs.payment.email === undefined) {
            handleInputChange("payment", "email", formInputs.contact.email);
            handleBlur(
                validationSchemas.email,
                formInputs.contact.email || "",
                "email"
            );
        }

        if (formInputs.payment.phoneNumber === undefined) {
            handleInputChange(
                "payment",
                "phoneNumber",
                formInputs.contact.phoneNumber
            );
            handleBlur(
                validationSchemas.phoneNumber,
                formInputs.contact.phoneNumber || "",
                "phoneNumber"
            );
        }
    }, [formInputs.contact.email, formInputs.contact.phoneNumber]);

    useEffect(() => {
        const countryHasStates = State.getStatesOfCountry(
            formInputs.payment.country
        );

        if (countryHasStates.length === 0) {
            updateErrors(true, "state", "");
        } else {
            updateErrors(false, "state", "");
        }
    }, [formInputs.payment.country]);

    return (
        <div className="md:pr-6 py-3 flex flex-col gap-3">
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
                        <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
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
                                    onBlur={(e) => {
                                        handleBlur(
                                            validationSchemas.email,
                                            e.target.value,
                                            "email"
                                        );
                                    }}
                                    type="email"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.email
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                                <p className="text-red-500 text-xs pt-1 h-6">
                                    {errors.payment.email.message}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
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
                                    onBlur={(e) => {
                                        handleBlur(
                                            validationSchemas.phoneNumber,
                                            e.target.value,
                                            "phoneNumber"
                                        );
                                    }}
                                    type="tel"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.phoneNumber
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                                <p className="text-red-500 text-xs pt-1 h-6">
                                    {errors.payment.phoneNumber.message}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (
                                    !errors.payment.email.withoutError ||
                                    !errors.payment.phoneNumber.withoutError
                                ) {
                                    return;
                                }

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
                            className="border-2 border-primary rounded-lg text-sm px-3 py-2 transition-all hover:bg-red-100 mt-3"
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
                        <div className="flex flex-row flex-wrap justify-between">
                            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
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
                                    onBlur={(e) => {
                                        handleBlur(
                                            validationSchemas.address,
                                            e.target.value,
                                            "address"
                                        );
                                    }}
                                    type="text"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.addressLine1
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                                <p className="text-red-500 text-xs pt-1 h-6">
                                    {errors.payment.address.message}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
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
                                <p className="text-red-500 text-xs pt-1 h-6"></p>
                            </div>

                            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
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
                                    onBlur={(e) => {
                                        handleBlur(
                                            validationSchemas.postcode,
                                            e.target.value,
                                            "postcode"
                                        );
                                    }}
                                    type="text"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.postcode
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                                <p className="text-red-500 text-xs pt-1 h-6">
                                    {errors.payment.postcode.message}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
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
                                    onBlur={(e) => {
                                        handleBlur(
                                            validationSchemas.city,
                                            e.target.value,
                                            "city"
                                        );
                                    }}
                                    type="text"
                                    className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis flex-grow outline-none transition-all focus:border-primary ${
                                        formInputs.payment.city
                                            ? "border-primary"
                                            : "border-red-200"
                                    }`}
                                />
                                <p className="text-red-500 text-xs pt-1 h-6">
                                    {errors.payment.city.message}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
                                <p>Country</p>
                                <div className="relative">
                                    <select
                                        className={`border-2 py-1 focus:outline-none pl-2 w-full outline-none transition-all focus:border-primary ${
                                            formInputs.payment.country
                                                ? "border-primary"
                                                : "border-red-200"
                                        }`}
                                        onBlur={(e) => {
                                            updateErrors(
                                                e.target.value !== "select",
                                                "country",
                                                e.target.value === "select"
                                                    ? "Please select a country"
                                                    : ""
                                            );
                                        }}
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
                                <p className="text-red-500 text-xs pt-1 h-6">
                                    {errors.payment.country.message}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
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
                                        onBlur={(e) => {
                                            const statesListCount =
                                                State.getStatesOfCountry(
                                                    formInputs.payment.country
                                                ).length;

                                            const isValid =
                                                statesListCount === 0 ||
                                                e.target.value !== "select";

                                            updateErrors(
                                                isValid,
                                                "state",
                                                isValid
                                                    ? ""
                                                    : "Please enter a state"
                                            );
                                        }}
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
                                <p className="text-red-500 text-xs pt-1 h-6">
                                    {errors.payment.state.message}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                const addressFields: PaymentKeys[] = [
                                    "address",
                                    "postcode",
                                    "city",
                                    "country",
                                    "state",
                                ];

                                const addressHasErrors = addressFields.some(
                                    (field) =>
                                        !errors.payment[field].withoutError
                                );

                                if (addressHasErrors) {
                                    return;
                                }

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
                            className="border-2 border-primary rounded-lg text-sm px-3 py-2 transition-all hover:bg-red-100 mt-3"
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
                            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
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
                                        onBlur={(e) => {
                                            handleBlur(
                                                validationSchemas.cardNo,
                                                e.target.value,
                                                "cardNo"
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
                                <p className="text-red-500 text-xs pt-1 h-6">
                                    {errors.payment.cardNo.message}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
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
                                    onBlur={(e) => {
                                        handleBlur(
                                            validationSchemas.cardholder,
                                            e.target.value,
                                            "cardholder"
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
                                <p className="text-red-500 text-xs pt-1 h-6">
                                    {errors.payment.cardholder.message}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 relative md:w-[calc(25%-9px)] w-[calc(50%-6px)]">
                                <p>Expiry Date</p>
                                <input
                                    onKeyDown={(
                                        e: React.KeyboardEvent<HTMLInputElement>
                                    ) => {
                                        e.key === "Backspace"
                                            ? setBackspacePressed(true)
                                            : setBackspacePressed(false);
                                    }}
                                    onBlur={(e) => {
                                        handleBlur(
                                            validationSchemas.expiry,
                                            e.target.value,
                                            "expiry"
                                        );
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

                                        if (value.length > 7) {
                                            value = value.slice(0, 7);
                                        }

                                        if (
                                            value.length === 3 &&
                                            backspacePressed
                                        ) {
                                            value = value.slice(0, 2);
                                        }

                                        if (
                                            value.length === 2 &&
                                            !value.includes("/") &&
                                            !backspacePressed
                                        ) {
                                            const month = parseInt(value, 10);
                                            if (month >= 1 && month <= 12) {
                                                value = `${value}/`;
                                            }
                                        }

                                        const [month, year] = value.split("/");

                                        if (month && parseInt(month, 10) > 12) {
                                            return;
                                        }

                                        if (year && year.length > 4) {
                                            return;
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

                            <div className="flex flex-col gap-1 relative md:w-[calc(25%-9px)] w-[calc(50%-6px)]">
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
                                    onBlur={(e) => {
                                        handleBlur(
                                            validationSchemas.cvc,
                                            e.target.value,
                                            "cvc"
                                        );
                                    }}
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
                            {(errors.payment.expiry.message ||
                                errors.payment.cvc.message) && (
                                <div className="w-full">
                                    <p className="text-red-500 text-xs pt-1 h-6 -mt-2">
                                        {`${errors.payment.expiry.message}${
                                            errors.payment.expiry.message &&
                                            errors.payment.cvc.message
                                                ? ". "
                                                : ""
                                        }${errors.payment.cvc.message}`}
                                    </p>
                                </div>
                            )}
                            <div className="flex flex-row gap-1 items-center w-full">
                                <input
                                    className="md:mr-0 mr-2"
                                    onChange={(e) => {
                                        handleInputChange(
                                            "payment",
                                            "consent",
                                            !formInputs.payment.consent
                                        );

                                        updateErrors(
                                            e.target.checked,
                                            "consent",
                                            e.target.checked
                                                ? ""
                                                : "Please consent to the above"
                                        );
                                    }}
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
                            {errors.payment.consent.message && (
                                <p className="text-red-500 text-xs pt-1 h-6 -mt-2">
                                    {errors.payment.consent.message}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                const addressFields: PaymentKeys[] = [
                                    "cardNo",
                                    "cardholder",
                                    "expiry",
                                    "cvc",
                                    "consent",
                                ];

                                const addressHasErrors = addressFields.some(
                                    (field) =>
                                        !errors.payment[field].withoutError
                                );

                                if (addressHasErrors) {
                                    return;
                                }

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
                            className="border-2 border-primary rounded-lg text-sm px-3 py-2 transition-all hover:bg-red-100 mt-3"
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

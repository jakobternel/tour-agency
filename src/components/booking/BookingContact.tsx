import { useEffect, useState } from "react";

import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { Country } from "country-state-city";

import { FormInputType } from "../../types/FormInput";
import { ErrorTypes } from "../../types/FormValidation";
import { ZodEffects, ZodString } from "zod/lib/types";

import { validationSchemas } from "../../utils/validation";

const BookingContact: React.FC<{
    formInputs: FormInputType;
    handleInputChange: <T extends keyof FormInputType>(
        section: T,
        field: keyof FormInputType[T],
        value: FormInputType[T][keyof FormInputType[T]]
    ) => void;
    updateErrors: (
        withoutError: boolean,
        fieldCode: string,
        message: string
    ) => void;
    errors: ErrorTypes;
}> = ({ formInputs, handleInputChange, updateErrors, errors }) => {
    const [codeSelectActive, setCodeSelectActive] = useState<boolean>(false);

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

    return (
        <div className="flex flex-row w-full py-3 flex-wrap gap-1 md:gap-6 md:pr-6">
            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
                <p>
                    First Name <sup className="text-red-500">*</sup>
                </p>
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="John"
                        value={formInputs.contact.firstName}
                        onChange={(e) =>
                            handleInputChange(
                                "contact",
                                "firstName",
                                e.target.value
                            )
                        }
                        onBlur={(e) => {
                            handleBlur(
                                validationSchemas.firstName,
                                e.target.value,
                                "firstName"
                            );
                        }}
                        className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis outline-none transition-all focus:border-primary w-full ${
                            formInputs.contact.firstName
                                ? "border-primary"
                                : "border-red-200"
                        }`}
                    />
                    <p className="text-red-500 text-xs pt-1 h-6">
                        {errors?.contact?.firstName?.message || ""}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
                <p>
                    Surname <sup className="text-red-500">*</sup>
                </p>
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Smith"
                        value={formInputs.contact.lastName}
                        onChange={(e) =>
                            handleInputChange(
                                "contact",
                                "lastName",
                                e.target.value
                            )
                        }
                        onBlur={(e) =>
                            handleBlur(
                                validationSchemas.surname,
                                e.target.value,
                                "surname"
                            )
                        }
                        className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis outline-none transition-all focus:border-primary w-full ${
                            formInputs.contact.lastName
                                ? "border-primary"
                                : "border-red-200"
                        }`}
                    />
                    <p className="text-red-500 text-xs pt-1 h-6">
                        {errors?.contact?.surname?.message || ""}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
                <p>
                    Email Address <sup className="text-red-500">*</sup>
                </p>
                <div className="flex-grow">
                    <input
                        type="email"
                        placeholder="john@email.com"
                        value={formInputs.contact.email}
                        onChange={(e) =>
                            handleInputChange(
                                "contact",
                                "email",
                                e.target.value
                            )
                        }
                        onBlur={(e) => {
                            handleBlur(
                                validationSchemas.email,
                                e.target.value,
                                "email"
                            );
                        }}
                        className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis outline-none transition-all focus:border-primary w-full ${
                            formInputs.contact.email
                                ? "border-primary"
                                : "border-red-200"
                        }`}
                    />
                    <p className="text-red-500 text-xs pt-1 h-6">
                        {errors?.contact?.email?.message || ""}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
                <p>
                    Confirm Email Address <sup className="text-red-500">*</sup>
                </p>
                <div className="flex-grow">
                    <input
                        type="email"
                        placeholder="john@email.com"
                        value={formInputs.contact.emailConfirm}
                        onChange={(e) =>
                            handleInputChange(
                                "contact",
                                "emailConfirm",
                                e.target.value
                            )
                        }
                        onBlur={(e) => {
                            if (
                                validationSchemas.email.safeParse(
                                    e.target.value
                                ).success
                            ) {
                                const emailMatch =
                                    formInputs.contact.email ===
                                    formInputs.contact.emailConfirm;

                                updateErrors(
                                    emailMatch,
                                    "emailConfirm",
                                    !emailMatch
                                        ? "Email addresses do not match"
                                        : ""
                                );
                            } else {
                                handleBlur(
                                    validationSchemas.email,
                                    e.target.value,
                                    "emailConfirm"
                                );
                            }
                        }}
                        className={`border-2 py-1 pl-2 focus:outline-none overflow-ellipsis outline-none transition-all focus:border-primary w-full ${
                            formInputs.contact.emailConfirm
                                ? "border-primary"
                                : "border-red-200"
                        }`}
                    />
                    <p className="text-red-500 text-xs pt-1 h-6">
                        {errors?.contact?.emailConfirm?.message || ""}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
                <p>
                    Phone Number <sup className="text-red-500">*</sup>
                </p>
                <div className="relative w-full">
                    <div className="flex flex-row w-full min-w-0">
                        <div
                            className={`border-2 border-r-0 ${
                                codeSelectActive
                                    ? "border-primary"
                                    : "border-red-200"
                            } px-3 py-1 flex flex-row gap-2 w-16 justify-between cursor-pointer items-center transition-all`}
                            onClick={() =>
                                setCodeSelectActive(!codeSelectActive)
                            }
                        >
                            <span>
                                {getUnicodeFlagIcon(
                                    formInputs.contact.countryCode || "AU"
                                )}
                            </span>
                            <i className="fi fi-rr-caret-down"></i>
                        </div>
                        <input
                            type="tel"
                            className={`border-2 py-1 focus:outline-none overflow-ellipsis pl-2 flex-grow min-w-0 outline-none transition-all focus:border-primary ${
                                codeSelectActive ||
                                formInputs.contact.phoneNumber
                                    ? "border-primary"
                                    : "border-red-200"
                            }
                            `}
                            value={formInputs.contact.phoneNumber}
                            onChange={(e) => {
                                handleInputChange(
                                    "contact",
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
                        />
                    </div>
                    {codeSelectActive && (
                        <div className="z-10 w-full rounded-b-md border-2 border-t-0 border-primary absolute overflow-y-auto max-h-48">
                            {Country.getAllCountries().map((country) => {
                                return (
                                    <div
                                        key={country.isoCode}
                                        className="flex flex-row items-center bg-red-50 hover:bg-red-100 p-1 font-montserrat text-sm border-red-200 cursor-pointer [&:not(:last-child)]:border-b-2 [&:last-child]:rounded-b-["
                                        onClick={() => {
                                            setCodeSelectActive(false);
                                            handleInputChange(
                                                "contact",
                                                "countryCode",
                                                country.isoCode
                                            );
                                            handleInputChange(
                                                "contact",
                                                "phoneNumber",
                                                `${
                                                    country.phonecode.includes(
                                                        "+"
                                                    )
                                                        ? ""
                                                        : "+"
                                                }${country.phonecode} `
                                            );
                                        }}
                                    >
                                        <span className="w-16 text-xl text-center b-r-2 border-primary">
                                            {getUnicodeFlagIcon(
                                                country.isoCode
                                            )}
                                        </span>
                                        <span className="text-sm">
                                            {country.name} (
                                            {country.phonecode.includes("+")
                                                ? ""
                                                : "+"}
                                            {country.phonecode})
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <p className="text-red-500 text-xs pt-1 h-6 -mt-1">
                    {errors?.contact?.phoneNumber?.message || ""}
                </p>
            </div>
            <div className="flex flex-col gap-1 relative w-full md:w-[calc(50%-12px)]">
                <p>
                    Country <sup className="text-red-500">*</sup>
                </p>
                <div className="relative">
                    <select
                        className={`border-2 py-1 focus:outline-none pl-2 w-full outline-none transition-all focus:border-primary ${
                            formInputs.contact.country
                                ? "border-primary"
                                : "border-red-200"
                        }`}
                        defaultValue={
                            formInputs.contact.country
                                ? formInputs.contact.country
                                : "select"
                        }
                        onChange={(e) => {
                            updateErrors(
                                e.target.value !== "select",
                                "country",
                                e.target.value === "select"
                                    ? "Please select a country"
                                    : ""
                            );

                            handleInputChange(
                                "contact",
                                "country",
                                e.target.value
                            );
                        }}
                        onBlur={(e) => {
                            updateErrors(
                                e.target.value !== "select",
                                "country",
                                e.target.value === "select"
                                    ? "Please select a country"
                                    : ""
                            );
                        }}
                    >
                        <option value="select" disabled={true}>
                            Select Country
                        </option>
                        {Country.getAllCountries().map((country) => {
                            return (
                                <option
                                    key={country.isoCode}
                                    value={country.isoCode}
                                >
                                    {country.name}
                                </option>
                            );
                        })}
                    </select>
                    <i className="fi fi-br-angle-down absolute right-2 top-1/2 -translate-y-1/2 text-primary"></i>
                </div>
                <p className="text-red-500 text-xs pt-1 h-6 -mt-1">
                    {errors?.contact?.country?.message || ""}
                </p>
            </div>
            <div className="flex flex-col gap-1 relative w-full">
                <p>
                    Special Requests (Please enter any necessary dietary
                    requirements or medical conditions)
                </p>
                <textarea
                    value={formInputs.contact.specialRequests}
                    onChange={(e) =>
                        handleInputChange(
                            "contact",
                            "specialRequests",
                            e.target.value
                        )
                    }
                    className={`border-2 focus:outline-none h-full p-2 resize-none outline-none transition-all focus:border-primary ${
                        formInputs.contact.specialRequests
                            ? "border-primary"
                            : "border-red-200"
                    }`}
                ></textarea>
            </div>
        </div>
    );
};

export default BookingContact;

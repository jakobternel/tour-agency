import { useEffect, useState } from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

import countryCodes from "../../data/countryCodes.json";

const Booking_Contact: React.FC = () => {
    const [codeSelectActive, setCodeSelectActive] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string>("AU");

    return (
        <div className="flex flex-row w-full pr-3 py-3 flex-wrap gap-6">
            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
                <p>
                    First Name <sup className="text-red-500">*</sup>
                </p>
                <input
                    type="text"
                    placeholder="John"
                    className="border-2 border-primary py-1 pl-2 focus:outline-none overflow-ellipsis pr-6 flex-grow"
                />
            </div>
            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
                <p>
                    Surname <sup className="text-red-500">*</sup>
                </p>
                <input
                    type="text"
                    placeholder="Smith"
                    className="border-2 border-primary py-1 pl-2 focus:outline-none overflow-ellipsis pr-6 flex-grow"
                />
            </div>
            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
                <p>
                    Email Address <sup className="text-red-500">*</sup>
                </p>
                <input
                    type="email"
                    placeholder="john@email.com"
                    className="border-2 border-primary py-1 pl-2 focus:outline-none overflow-ellipsis pr-6 flex-grow"
                />
            </div>
            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
                <p>
                    Confirm Email Address <sup className="text-red-500">*</sup>
                </p>
                <input
                    type="email"
                    placeholder="john@email.com"
                    className="border-2 border-primary py-1 pl-2 focus:outline-none overflow-ellipsis pr-6 flex-grow"
                />
            </div>
            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
                <p>
                    Phone Number <sup className="text-red-500">*</sup>
                </p>
                <div className="relative w-full">
                    <div className="flex flex-row w-full">
                        <div
                            className="border-2 border-r-0 border-primary px-3 py-1 flex flex-row gap-2 w-16 justify-between cursor-pointer items-center"
                            onClick={() =>
                                setCodeSelectActive(!codeSelectActive)
                            }
                        >
                            <span>
                                {getUnicodeFlagIcon(selectedCountry || "AU")}
                            </span>
                            <i className="fi fi-rr-caret-down"></i>
                        </div>
                        <input
                            type="tel"
                            className="border-2 border-primary py-1 focus:outline-none overflow-ellipsis pl-2 flex-grow"
                        />
                    </div>
                    {codeSelectActive && (
                        <div className="z-10 w-full rounded-b-md border-2 border-t-0 border-primary absolute overflow-y-auto max-h-48">
                            {countryCodes.map((country) => {
                                return (
                                    <div
                                        key={country.isoCode2}
                                        className="flex flex-row items-center bg-red-50 hover:bg-red-100 p-1 font-montserrat text-sm border-red-200 cursor-pointer [&:not(:last-child)]:border-b-2 [&:last-child]:rounded-b-["
                                        onClick={() => {
                                            setCodeSelectActive(false);
                                            setSelectedCountry(
                                                country.isoCode2
                                            );
                                        }}
                                    >
                                        <span className="w-16 text-xl text-center b-r-2 border-primary">
                                            {getUnicodeFlagIcon(
                                                country.isoCode2
                                            )}
                                        </span>
                                        <span className="text-sm">
                                            {country.country} ( +
                                            {country.countryCodes})
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-1 relative w-[calc(50%-12px)]">
                <p>
                    Country <sup className="text-red-500">*</sup>
                </p>
                <div className="relative">
                    <select className="border-2 border-primary py-1 focus:outline-none pl-2 w-full">
                        {countryCodes.map((country) => {
                            return (
                                <option
                                    key={country.isoCode2}
                                    value={country.isoCode2}
                                >
                                    {country.country}
                                </option>
                            );
                        })}
                    </select>
                    <i className="fi fi-br-angle-down absolute right-2 top-1/2 -translate-y-1/2 text-primary"></i>
                </div>
            </div>
            <div className="flex flex-col gap-1 relative w-full">
                <p>
                    Special Requests (Please enter any necessary dietary
                    requirements or medical conditions)
                </p>
                <textarea className="border-2 border-primary focus:outline-none h-full p-2"></textarea>
            </div>
        </div>
    );
};

export default Booking_Contact;

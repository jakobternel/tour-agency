const Booking: React.FC = () => {
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
                                Step 1 - Select Arrival Dates
                            </p>
                            <input
                                type="date"
                                className="w-1/2 border-2 border-primary p-1 focus:outline-none"
                            />
                        </div>

                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex flex-row gap-1 items-center">
                            <p className="w-1/2">
                                Step 2 - Select Accomodation Type
                            </p>
                            <select className="w-1/2 border-2 border-primary p-1 focus:outline-none">
                                <option>Basic Private Room</option>
                                <option>Premier Private Room</option>
                                <option>Private Suite</option>
                            </select>
                        </div>

                        <div className="border-b-gray-200 border-b-2 py-3 pr-3 flex gap-1 items-center">
                            <p className="w-1/2">
                                Step 3 - Select Additional Activities
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
                        <p className="font-montserrat font-semibold mb-1">
                            Trip Dates
                        </p>
                        <div className="ml-3">
                            <div className="flex flex-row justify-between">
                                <p className="font-montserrat">Departure</p>
                                <p className="text-gray-500 font-mono">
                                    24/07/2024
                                </p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="font-montserrat">Arrival</p>
                                <p className="text-gray-500 font-mono">
                                    07/08/2025
                                </p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p className="font-montserrat">
                                    Flight Surcharge
                                </p>
                                <p className="text-gray-500 font-mono">
                                    + $1,000
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <p className="font-montserrat font-semibold">
                                Base Price:
                            </p>
                            <p className="font-mono">$1,500</p>
                        </div>
                        <div className="ml-3">
                            <div className="flex flex-row justify-between">
                                <p className="font-montserrat">
                                    Premier Private Room
                                </p>
                                <p className="text-gray-500 font-mono">
                                    + $100
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
                        <p className="font-mono font-bold">$2,232</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;

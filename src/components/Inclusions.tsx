const airplane = require("../images/shared/airplane.png");
const hotel = require("../images/shared/hotel.png");
const tickets = require("../images/shared/tickets.png");
const tour = require("../images/shared/tour.png");
const bus = require("../images/shared/bus.png");
const support = require("../images/shared/support.png");

const Inclusions: React.FC = () => {
    return (
        <div className="w-full h-min">
            <div className="p-7 md:p-20 flex flex-col items-center gap-3 md:gap-10">
                <p className="font-lobster text-3xl text-center">
                    What's Included
                </p>
                <div className="flex flex-wrap justify-between w-full gap-3">
                    <div className="bento w-full md:w-[calc(100%/3-12px)] flex flex-col gap-3">
                        <div className="flex flex-row gap-5 items-center">
                            <img
                                src={airplane}
                                alt="flights"
                                className="h-10"
                            />
                            <p className="font-montserrat font-semibold">
                                Return Flights
                            </p>
                        </div>
                        <p className="text-sm">
                            With return flights included, your travel experience
                            is smoother and more convenient. There's no need to
                            worry about booking separate tickets or coordinating
                            schedules.
                        </p>
                    </div>
                    <div className="bento w-full md:w-[calc(100%/3-12px)] flex flex-col gap-3">
                        <div className="flex flex-row gap-5 items-center">
                            <img src={hotel} alt="hotel" className="h-10" />
                            <p className="font-montserrat font-semibold">
                                4<sup>*</sup> Hotel Accomodation
                            </p>
                        </div>
                        <p className="text-sm">
                            With hotel accommodation included, you can relax
                            knowing your stay is sorted. No need to worry about
                            availability — we provide a comfortable and
                            convenient place for your travels.
                        </p>
                    </div>
                    <div className="bento w-full md:w-[calc(100%/3-12px)] flex flex-col gap-3">
                        <div className="flex flex-row gap-5 items-center">
                            <img src={bus} alt="bus" className="h-10" />
                            <p className="font-montserrat font-semibold">
                                Transport
                            </p>
                        </div>
                        <p className="text-sm">
                            With private tour buses and transport included,
                            getting around is effortless and convenient. Sit
                            back, relax, and take in the scenery while we handle
                            all the logistics for you.
                        </p>
                    </div>
                    <div className="bento w-full md:w-[calc(100%/3-12px)] flex flex-col gap-3">
                        <div className="flex flex-row gap-5 items-center">
                            <img src={tour} alt="tour" className="h-10" />
                            <p className="font-montserrat font-semibold">
                                Local Tour Guides
                            </p>
                        </div>
                        <p className="text-sm">
                            With local tour guides included, you'll have expert
                            insights and a more immersive experience, ensuring
                            you make the most of your destination.
                        </p>
                    </div>
                    <div className="bento w-full md:w-[calc(100%/3-12px)] flex flex-col gap-3">
                        <div className="flex flex-row gap-5 items-center">
                            <img src={tickets} alt="tickets" className="h-10" />
                            <p className="font-montserrat font-semibold">
                                Entry Tickets
                            </p>
                        </div>
                        <p className="text-sm">
                            Entry tickets included means you'll have access to
                            all the must-see attractions, skipping the hassle of
                            waiting in line or worrying about availability.
                        </p>
                    </div>
                    <div className="bento w-full md:w-[calc(100%/3-12px)] flex flex-col gap-3">
                        <div className="flex flex-row gap-5 items-center">
                            <img src={support} alt="support" className="h-10" />
                            <p className="font-montserrat font-semibold">
                                24/7 Live Support
                            </p>
                        </div>
                        <p className="text-sm">
                            With 24/7 support, help is always just a call away,
                            ensuring you feel secure and supported throughout
                            your entire journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inclusions;

import { DestinationContent } from "../types/InputData";

const DestinationLayout: React.FC<{
    data: DestinationContent;
    scrollToRef: (ref: React.MutableRefObject<HTMLDivElement | null>) => void;
    bookingRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ data, scrollToRef, bookingRef }) => {
    return (
        <div className="md:h-screen w-full bg-primary p-6 md:px-20 md:py-20">
            <div className="h-full w-full flex flex-row">
                <div className="hidden h-full w-2/5 md:flex flex-col justify-between flex-wrap content-between">
                    {Object.values(data.destinationImages).map(
                        (
                            image: { size: string; fileSrc: string },
                            index: number
                        ) => {
                            if (image.size === "short") {
                                return (
                                    <img
                                        key={index}
                                        className="w-[calc((100%/2)-12px)] h-[calc(100%/3-12px)] rounded-xl object-cover shadow-lg"
                                        src={image.fileSrc}
                                        alt={`${data.country} ${index}`}
                                    />
                                );
                            } else if (image.size === "tall") {
                                return (
                                    <img
                                        key={index}
                                        className="w-[calc((100%/2)-12px)] h-[calc(100%/1.5-12px)] rounded-xl object-cover shadow-lg"
                                        src={image.fileSrc}
                                        alt={`germany ${index}`}
                                    />
                                );
                            }
                            return <></>;
                        }
                    )}
                </div>
                <div className="bg-white md:h-full md:w-3/5 md:ml-6 rounded-xl p-8 md:p-10 shadow-lg flex gap-6 flex-col">
                    <p className="font-lobster w-min text-3xl whitespace-nowrap -rotate-6 origin-center font-extralight text-primary">
                        {`${data.city}${data.city ? ", " : ""}${data.country}`}
                    </p>
                    <p className="font-montserrat font-semibold">
                        {data.tagline}
                    </p>
                    {data.description.map((text, index) => {
                        return (
                            <p className="text-sm md:text-md" key={index}>
                                {text}
                            </p>
                        );
                    })}
                    <span className="hidden md:block md:flex-grow"></span>
                    <button
                        className="border-primary border-2 w-min whitespace-nowrap py-2 px-5 rounded-xl hover:bg-red-100 font-semibold font-montserrat transition-all text-sm md:text-md"
                        onClick={() => scrollToRef(bookingRef)}
                    >
                        Book Now!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationLayout;

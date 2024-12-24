const DestinationLayout: React.FC<{
    data: {
        country: string;
        city: string;
        tagline: string;
        description: string[];
        destinationImages: {
            [key: string]: {
                size: string;
                fileSrc: string;
            };
        };
    };
}> = ({ data }) => {
    return (
        <div className="h-screen w-full bg-primary px-20 py-20">
            <div className="h-full w-full flex flex-row">
                <div className="h-full w-2/5 flex flex-col justify-between flex-wrap content-between">
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
                        }
                    )}
                </div>
                <div className="bg-white h-full w-3/5 ml-6 rounded-xl p-10 shadow-lg flex gap-6 flex-col">
                    <p className="font-lobster w-min text-3xl whitespace-nowrap -rotate-6 origin-center font-extralight text-primary">
                        {`${data.city}, ${data.country}`}
                    </p>
                    <p className="font-montserrat font-semibold">
                        {data.tagline}
                    </p>
                    {data.description.map((text, index) => {
                        return <p key={index}>{text}</p>;
                    })}
                    <span className="flex-grow"></span>
                    <button className="border-primary border-2 w-min whitespace-nowrap py-2 px-5 rounded-xl hover:bg-red-100 font-semibold font-montserrat transition-all">
                        Book Now!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationLayout;

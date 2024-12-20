const DestinationLayout: React.FC = () => {
    return (
        <div className="h-screen w-full bg-primary px-20 py-20">
            <div className="h-full w-full flex flex-row">
                <div className="h-full w-2/5 flex flex-col justify-between flex-wrap content-between">
                    <img
                        className="w-[calc((100%/2)-12px)] h-[calc(100%/1.5-12px)] rounded-xl object-cover shadow-lg"
                        src="https://images.pexels.com/photos/29721184/pexels-photo-29721184/free-photo-of-majestic-new-town-hall-tower-in-munich.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="image 1"
                    />
                    <img
                        className="w-[calc((100%/2)-12px)] h-[calc(100%/3-12px)] rounded-xl object-cover shadow-lg"
                        src="https://images.pexels.com/photos/187854/pexels-photo-187854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="image 2"
                    />
                    <img
                        className="w-[calc((100%/2)-12px)] h-[calc(100%/3-12px)] rounded-xl object-cover shadow-lg"
                        src="https://images.pexels.com/photos/221519/pexels-photo-221519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="image 3"
                    />
                    <img
                        className="w-[calc((100%/2)-12px)] h-[calc(100%/1.5-12px)] rounded-xl object-cover shadow-lg"
                        src="https://images.pexels.com/photos/29719841/pexels-photo-29719841/free-photo-of-frauenkirche-in-munich-with-festive-lights.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="image 4"
                    />
                </div>
                <div className="bg-white h-full w-3/5 ml-6 rounded-xl p-10 shadow-lg flex gap-6 flex-col">
                    <p className="font-lobster w-min text-3xl whitespace-nowrap -rotate-6 origin-center font-extralight text-primary">
                        Munich, Germany
                    </p>
                    <p className="font-montserrat font-semibold">
                        Where tradition meets tomorrow!
                    </p>
                    <p>
                        Munich, the vibrant capital of Bavaria, is a city where
                        history, culture, and innovation seamlessly blend. Known
                        for its stunning architecture, centuries-old traditions,
                        and warm hospitality, Munich invites visitors to stroll
                        through its iconic Marienplatz, explore the majestic
                        Nymphenburg Palace, or raise a glass at a bustling beer
                        garden. With its rich history dating back to 1158, the
                        city preserves its heritage while embracing modernity,
                        creating an unforgettable experience for travelers.
                    </p>
                    <p>
                        Beyond its historic charm, Munich is a hub of art,
                        culture, and nature. Explore world-renowned museums like
                        the Deutsches Museum and Alte Pinakothek, or relax in
                        the sprawling greenery of the English Garden, one of the
                        largest urban parks in the world. As the home of
                        Oktoberfest, Munich celebrates its famous beer culture
                        with pride, while its markets and festivals showcase
                        Bavarian traditions year-round. Whether you're wandering
                        through cobblestone streets or shopping at
                        Viktualienmarkt, Munich is alive with sights, sounds,
                        and flavors to savor.
                    </p>
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

const Testimonials: React.FC = () => {
    const testimonialData: {
        name: string;
        testimonial: string;
        image: string;
        city: string;
    }[] = [
        {
            name: "Oliver Hartman",
            testimonial:
                "I can't recommend JetSet enough! Every detail was so well-organized, from transport to accommodations. They made our trip stress-free and unforgettable!",
            image: "https://images.pexels.com/photos/29784200/pexels-photo-29784200/free-photo-of-young-photographer-enjoying-ho-chi-minh-city-pier.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            city: "Buenos Aires, Argentina",
        },
        {
            name: "Hiroshi Takamura",
            testimonial:
                "Outstanding service! The local guides were incredibly knowledgeable, and the itinerary was perfectly balanced between sightseeing and relaxation.",
            image: "https://images.pexels.com/photos/12482360/pexels-photo-12482360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            city: "Kyoto, Japan",
        },
        {
            name: "Emilia Fischer",
            testimonial:
                "Flawless planning and seamless execution! They went above and beyond to make sure our trip was unforgettable. Will book again for sure!",
            image: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            city: "Cape Town, South Africa",
        },
        {
            name: "Jan Novák",
            testimonial:
                "We had the best trip thanks to JetSet. The personalized attention and unique experiences made all the difference.",
            city: "Prague, Czech Republic",
            image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
    ];

    const testimonials = () => {
        return testimonialData.map((testimonial) => {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-5 pt-12 w-1/4 relative flex flex-col items-center gap-5">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="absolute w-20 h-20 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover rounded-full border-4 border-white shadow-md"
                    />
                    <p className="text-sm text-center flex-grow flex justify-center items-center mt-2">
                        {testimonial.testimonial}
                    </p>
                    <hr className="bg-primary h-1 w-1/4 border-none rounded-full" />
                    <div className="text-center">
                        <p className="font-montserrat font-bold text-sm">
                            {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            {testimonial.city}
                        </p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="w-full py-20 flex justify-center">
            <div className="w-3/4 flex gap-6">{testimonials()}</div>
        </div>
    );
};

export default Testimonials;

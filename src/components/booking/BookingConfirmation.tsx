const BookingConfirmation: React.FC = () => {
    return (
        <div className="w-full h-64 flex flex-col items-center justify-center">
            <div className="relative size-32 flex justify-center items-center">
                <div className="bg-primary size-16 flex items-center justify-center rounded-full">
                    <i className="fi fi-br-check text-3xl text-white"></i>
                </div>
                <div className="absolute size-32 animate-spin">
                    <i className="fi fi-rs-plane text-2xl text-primary absolute top-0 left-1/2 -translate-x-1/2"></i>
                </div>
            </div>
            <div className="flex flex-col gap-1 mb-5 mt-2">
                <h1 className="font-montserrat font-bold text-2xl">
                    Booking Confirmed
                </h1>
                <p className="font-semibold">
                    Thank you for booking with JetSet
                </p>
            </div>
            <p className="text-xs text-center">
                We will be in touch shortly with a comprehensive trip plan and
                tickets
            </p>
        </div>
    );
};

export default BookingConfirmation;

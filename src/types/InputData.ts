export type HeroContent = {
    name: string;
    heroImageFolderRoute: string;
    heroImageNames: string[];
};

export type DestinationContent = {
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

export type BentoContent = {
    arrAirport: string;
    itinerary: { [key: string]: { icon: string; content: string } };
    destinationSuggestions: {
        title: string;
        icon: string;
        description: string;
    }[];
    destinationCoords: number[];
};

export type ItineraryContent = {
    [key: string]: {
        title: string;
        description: string[];
        inclusions?: string[];
        suggestions?: string[];
        accomodation?: string;
        meals?: string;
        budget?: string;
    };
};

export type BookingContent = {
    basePrice: number;
    defaultHotel: number;
    hotelContent: {
        [key: string]: {
            name: string;
            dailyAdditionalPrice: number;
        };
    };
    optionalActivities: {
        name: string;
        cost: number;
    }[];
};

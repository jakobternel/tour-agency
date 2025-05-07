export type TourData = {
    [key: string]: {
        heroContent: HeroContent;
        bentoContent: BentoContent;
        destinationInfoContent: DestinationContent;
        itineraryContent: ItineraryContent;
        bookingContent: BookingContent;
    };
};

export type HeroContent = {
    name: string;
    heroImageFolderRoute: string;
    defaultImage: string;
    heroImageNames: string[];
};

export type DestinationContent = {
    country: string;
    city: string;
    showCityName: boolean;
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

export type PointFeature = {
    id: string;
    type: "point";
    location: [number, number];
    main: boolean;
};

export type LineFeature = {
    id: string;
    type: "line";
    start: [number, number];
    end: [number, number];
    return: boolean;
};

export type ItineraryContent = {
    mapPoints: (PointFeature | LineFeature)[];
    itinerary: {
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
    displayOptionalActivitiesByDay: boolean;
    optionalActivities: {
        id: number;
        day: number;
        name: string;
        cost: number;
    }[];
};

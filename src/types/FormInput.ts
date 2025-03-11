export type FormInputType = {
    itinerary: {
        departureDate: string;
        departureAirport: string | undefined;
        departureAirportComplete: boolean;
        roomSelection: string;
        optionalActivities: number[];
    };
    contact: {
        firstName: string | undefined;
        lastName: string | undefined;
        email: string | undefined;
        emailConfirm: string | undefined;
        countryCode: string | undefined;
        phoneNumber: string | undefined;
        country: string | undefined;
        specialRequests: string | undefined;
    };
    payment: {
        email: string | undefined;
        phoneNumber: string | undefined;
        addressLine1: string | undefined;
        addressLine2: string | undefined;
        postcode: string | undefined;
        city: string | undefined;
        country: string | undefined;
        state: string | undefined;
        cardNo: string | undefined;
        cardholder: string | undefined;
        expiry: string | undefined;
        cvc: string | undefined;
        consent: boolean;
    };
};

import { ZodEffects, ZodString } from "zod/lib/types";

export type ValidationType = {
    [key in
        | "firstName"
        | "surname"
        | "address"
        | "city"
        | "email"
        | "phoneNumber"
        | "date"
        | "postcode"
        | "cardholder"
        | "cardNo"
        | "expiry"
        | "cvc"]: ZodString | ZodEffects<any>;
};

export type ItineraryKeys =
    | "departureAirport"
    | "departureDate"
    | "flightPriceLoading";
export type ContactKeys =
    | "firstName"
    | "surname"
    | "email"
    | "emailConfirm"
    | "phoneNumber"
    | "country";
export type PaymentKeys =
    | "email"
    | "phoneNumber"
    | "address"
    | "postcode"
    | "city"
    | "country"
    | "state"
    | "cardNo"
    | "cardholder"
    | "expiry"
    | "cvc"
    | "consent";

type ErrorFormat = { withoutError: boolean; message: string };

export type ErrorTypes = {
    itinerary: {
        [key in ItineraryKeys]: ErrorFormat;
    };
    contact: {
        [key in ContactKeys]: ErrorFormat;
    };
    payment: {
        [key in PaymentKeys]: ErrorFormat;
    };
};

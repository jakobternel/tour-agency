import { FormInputType } from "../types/FormInput";
import { ErrorTypes } from "../types/FormValidation";

export const defaultFormInput: FormInputType = {
    itinerary: {
        departureDate: "",
        departureAirport: undefined,
        departureAirportComplete: false,
        roomSelection: "0",
        optionalActivities: [],
    },
    contact: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        emailConfirm: undefined,
        countryCode: undefined,
        phoneNumber: undefined,
        country: undefined,
        specialRequests: undefined,
    },
    payment: {
        email: undefined,
        phoneNumber: undefined,
        addressLine1: undefined,
        addressLine2: undefined,
        postcode: undefined,
        city: undefined,
        country: undefined,
        state: undefined,
        cardNo: undefined,
        cardholder: undefined,
        expiry: undefined,
        cvc: undefined,
        consent: false,
    },
};

export const defaultFormErrors: ErrorTypes = {
    itinerary: {
        departureAirport: { withoutError: false, message: "" },
        departureDate: { withoutError: false, message: "" },
        flightPriceLoading: {withoutError: true, message: ""},
    },
    contact: {
        firstName: { withoutError: false, message: "" },
        surname: { withoutError: false, message: "" },
        email: { withoutError: false, message: "" },
        emailConfirm: { withoutError: false, message: "" },
        phoneNumber: { withoutError: false, message: "" },
        country: { withoutError: false, message: "" },
    },
    payment: {
        email: { withoutError: false, message: "" },
        phoneNumber: { withoutError: false, message: "" },
        address: { withoutError: false, message: "" },
        postcode: { withoutError: false, message: "" },
        city: { withoutError: false, message: "" },
        country: { withoutError: false, message: "" },
        state: { withoutError: false, message: "" },
        cardNo: { withoutError: false, message: "" },
        cardholder: { withoutError: false, message: "" },
        expiry: { withoutError: false, message: "" },
        cvc: { withoutError: false, message: "" },
        consent: { withoutError: false, message: "" },
    },
};

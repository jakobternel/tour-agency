const getAmadeusAcessToken = async () => {
    const response = await fetch(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_AMADEUS_FLIGHT_API_KEY}&client_secret=${process.env.REACT_APP_AMADEUS_FLIGHT_API_SECRET}`,
        }
    );

    if (!response.ok) {
        throw new Error(JSON.stringify(response));
    }

    const data = await response.json();
    return data.access_token;
};

const getIndividualFlightPrice = async (
    origin: string,
    destination: string,
    date: string,
    accessToken: string
) => {
    if (!accessToken) {
        throw new Error("No access token specified in request");
    }

    // Request flight prices
    const response = await fetch(
        "https://test.api.amadeus.com/v2/shopping/flight-offers",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                currencyCode: "USD",
                originDestinations: [
                    {
                        id: "1",
                        originLocationCode: origin,
                        destinationLocationCode: destination,
                        departureDateTimeRange: {
                            date: date,
                            time: "00:00:01",
                        },
                    },
                ],
                travelers: [
                    {
                        id: "1",
                        travelerType: "ADULT",
                    },
                ],
                sources: ["GDS"],
                searchCriteria: {
                    maxFlightOffers: 5,
                },
            }),
        }
    );

    const flightOffers = await response.json();

    // Loop through flights to find cheapest option
    let cheapestFlight = flightOffers.data[0];
    let cheapestPrice = flightOffers.data[0].price.grandTotal;

    flightOffers.data.forEach((flightOption: any) => {
        if (flightOption.price.grandTotal < cheapestPrice) {
            cheapestFlight = flightOption;
        }
    });

    return cheapestFlight;
};

export const getTotalFlightCost = async (
    origin: string,
    destination: string,
    departureDate: string,
    tripLength: number,
    returnTrip: boolean = false
) => {
    try {
        // Throw error if request is missing any of the parameters
        if (!origin || !destination || !departureDate) {
            throw new Error("getFlightCost request missing parameters");
        }

        // Check if departureDate is not yyyy-mm-dd format
        if (!/^\d{4}-\d{2}-\d{2}$/.test(departureDate)) {
            throw new Error(
                `departureDate param not in yyyy-mm-dd format: ${departureDate}`
            );
        }

        // Get Amadeus access token for requests
        const accessToken = await getAmadeusAcessToken();

        // Request cheapest flight price
        const cheapestFlightDepart = await getIndividualFlightPrice(
            origin,
            destination,
            departureDate,
            accessToken
        );

        let cheapestFlightArrive;

        // Request cheapest return flight price if specified
        if (returnTrip) {
            const date = new Date(departureDate);
            date.setDate(date.getDate() + tripLength);
            const futureDate = date.toISOString().split("T")[0];

            cheapestFlightArrive = await getIndividualFlightPrice(
                destination,
                origin,
                futureDate,
                accessToken
            );
        }

        return [cheapestFlightDepart, cheapestFlightArrive];
    } catch (error: any) {
        console.error("Error getting user flight price: ", error.message);
    }
};

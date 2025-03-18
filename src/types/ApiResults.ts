export type APIResultsType = {
    flights: {
        [key: string]: {
            [key: string]: {
                [key: string]: number;
            };
        };
    };
    flightInformation: {
        [key: string]: {
            [key: string]: any;
        };
    };
};

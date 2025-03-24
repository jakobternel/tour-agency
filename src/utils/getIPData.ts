export const getIPData = async () => {
    try {
        // Get IP address data and estimated lat lon coordinates. Throw error if API call unsuccessful
        const request = await fetch(
            `https://ipinfo.io/json?token=${process.env
                .REACT_APP_IPINFO_TOKEN!}`
        );

        const data = await request.json();

        if (request.status !== 200) {
            throw new Error(`Error ${request.status} from request`);
        }

        return data;
    } catch (error: any) {
        console.error("Error getting user IP data: ", error.message);
        return null;
    }
};

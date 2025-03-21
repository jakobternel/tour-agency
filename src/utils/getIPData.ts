export const getIPData = async () => {
    return null;

    try {
        // Get IP address data and estimated lat lon coordinates. Throw error if API call unsuccessful
        const request = await fetch("http://ip-api.com/json/");
        const data = await request.json();

        if (data.status === "fail") {
            throw new Error(data.message);
        }

        return data;
    } catch (error: any) {
        console.error("Error getting user IP data: ", error.message);
        return null;
    }
};

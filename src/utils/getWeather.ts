export const getWeather = async (coordinates: [number, number]) => {
    try {
        // Get weather forecast and current weather conditions from open meteo API
        const request = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&current=temperature_2m,weather_code&daily=weather_code,apparent_temperature_max,apparent_temperature_min&timezone=auto`
        );

        if (request.status === 400) {
            throw new Error("Weather API failed with error 400");
        }

        const data = await request.json();

        if (data.error === true) {
            throw new Error(data.reason);
        }

        return data;
    } catch (error: any) {
        console.error("Error getting weather:", error.message);
        return null;
    }
};

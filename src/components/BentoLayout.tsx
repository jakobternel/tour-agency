import { useEffect, useState } from "react";

import { getClosestAirport } from "../utils/airportSearch";
import { getWeather } from "../utils/getWeather";

import { AirportDataType } from "../types/AirportData";
import { WeatherForecastType } from "../types/WeatherForecastType";
import WMOMappings from "../data/wmoMappings.json";

const BentoLayout: React.FC<{
    data: {
        arrAirport: string;
        itinerary: { [key: string]: { icon: string; content: string } };
        destinationCoords: number[];
    };
}> = ({ data }) => {
    const [closestAirport, setClosestAirport] = useState<string | null>(null);
    const [currentWeather, setCurrentWeather] = useState<{
        time: string;
        interval: number;
        temperature_2m: number;
        weather_code: number;
    } | null>(null);
    const [forecastWeather, setForecastWeather] =
        useState<WeatherForecastType | null>(null);
    const [destinationCurrentDay, setDestinationCurrentDay] = useState<string>(
        new Date().toDateString()
    );

    useEffect(() => {
        const initClosestAirport = async () => {
            const result: AirportDataType | {} | null =
                await getClosestAirport();

            if (
                result !== null &&
                Object.keys(result).length !== 0 &&
                "iata_code" in result
            ) {
                setClosestAirport(result.iata_code);
            } else {
                setClosestAirport("LHR");
            }
        };

        const getWeatherForecast = async (
            destinationCoords: [number, number]
        ) => {
            const data = await getWeather(destinationCoords);

            if (data) {
                setCurrentWeather(data.current);

                const weatherForecast: WeatherForecastType = {};

                data.daily.time.forEach((day: string, index: number) => {
                    weatherForecast[day] = {
                        max: data.daily.apparent_temperature_max[index],
                        min: data.daily.apparent_temperature_min[index],
                        wmoCode: data.daily.weather_code[index],
                    };
                });

                setForecastWeather(weatherForecast);

                setDestinationCurrentDay(() => {
                    const currentTime = new Date();

                    const formattedDate = currentTime.toLocaleString("en-CA", {
                        timeZone: data.timezone,
                        year: "numeric",
                        day: "2-digit",
                        month: "2-digit",
                    });

                    return formattedDate.split(",")[0];
                });
            }
        };

        initClosestAirport();
        getWeatherForecast(data.destinationCoords as [number, number]);
    }, [data.destinationCoords]);

    const getConditionDetails = (wmoCode: number): [string, string] => {
        for (const condition of Object.values(WMOMappings)) {
            if (condition.wmoCodes.includes(wmoCode)) {
                return [condition.description, condition.icon];
            }
        }

        return ["Unknown Conditions", "fi-rr-cloud-question"];
    };

    const generateWeather = (): JSX.Element[] => {
        const date = new Date(destinationCurrentDay);
        const weatherItems: JSX.Element[] = [];

        for (let i = 1; i <= 4; i++) {
            date.setDate(date.getDate() + 1);
            const formattedDate = date.toLocaleString("en-CA", {
                year: "numeric",
                day: "2-digit",
                month: "2-digit",
            });

            weatherItems.push(
                <div
                    key={i}
                    className="w-full h-full rounded-full border-2 border-primary flex flex-col flex-grow flex-shrink basis-0 max-w-full min-w-0 justify-between items-center"
                >
                    <p className="mt-3 font-bold">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <i
                        className={`fi ${
                            getConditionDetails(
                                forecastWeather![formattedDate].wmoCode
                            )[1]
                        } text-2xl flex justify-center`}
                    ></i>
                    <p className="mb-3">
                        {forecastWeather && formattedDate in forecastWeather
                            ? forecastWeather[formattedDate].max
                            : "-"}
                        º
                    </p>
                </div>
            );
        }

        return weatherItems;
    };

    const generateItinerary = () => {
        const itineraryItems = Object.values(data.itinerary);
        const itineraryLength = itineraryItems.length;

        const generateItineraryItem = (
            data: {
                icon: string;
                content: string;
            },
            index: number
        ): JSX.Element => {
            return (
                <div
                    key={index}
                    className="flex flex-col items-center gap-2 w-1/5"
                >
                    <div className="rounded-full bg-primary">
                        <i
                            className={`fi ${data.icon} p-5 text-white text-2xl`}
                        ></i>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold mb-1">
                            Day {index + 1}
                        </p>
                        <p className="text-xs">{data.content}</p>
                    </div>
                </div>
            );
        };

        const itemsToShow = itineraryLength > 5 ? 4 : itineraryLength;
        const items: JSX.Element[] = itineraryItems
            .slice(0, itemsToShow)
            .map((item, index) => generateItineraryItem(item, index));

        if (itineraryLength > 5) {
            items.push(
                <div
                    className="flex flex-col items-center w-1/5"
                    key="more-button"
                >
                    <div className="bg-primary hover:bg-primaryOff transition-all text-white font-montserrat font-semibold rounded-full h-16 w-16 flex flex-col justify-center items-center cursor-pointer">
                        <p className="text-sm">More</p>
                        <i className="fi fi-rr-arrow-right"></i>
                    </div>
                </div>
            );
        }

        return items;
    };

    return (
        <div
            className="h-screen w-full py-40 px-20 -mt-10 flex flex-row flex-wrap bg-red-50"
            id="1"
        >
            <div className="w-2/4 h-1/2 p-3">
                <div className="bento flex gap-3 justify-between flex-col">
                    <p className="font-bold font-montserrat">Itinerary</p>
                    <div className="flex flex-row justify-between">
                        {generateItinerary()}
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-1/2 p-3">
                <div className="bento flex justify-between flex-col gap-5">
                    <div className="flex flex-row gap-3">
                        <div className="flex justify-center flex-col">
                            <i className="fi fi-ss-plane text-3xl text-primary"></i>
                        </div>
                        <div className="text-sm">
                            <p className="font-mono font-bold">$8,999</p>
                            <p className="">
                                24hr 30min{" "}
                                <span className="font-[r1em] text-gray-400">
                                    ●
                                </span>{" "}
                                1 stop
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-sm flex flex-row items-center gap-2">
                            <span>{closestAirport}</span>
                            <i className="fi fi-rr-arrow-right"></i>
                            <span>{data.arrAirport}</span>
                        </div>
                        <button className="bg-primary text-white py-1 px-5 rounded-full font-montserrat transition-colors hover:bg-primaryOff">
                            Book
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-1/2 p-3">
                <div className="bento flex flex-col gap-6">
                    <div className="flex flex-row justify-between">
                        <div className="flex gap-3 content-center items-center">
                            {currentWeather && (
                                <i
                                    className={`fi ${
                                        getConditionDetails(
                                            currentWeather.weather_code
                                        )[1]
                                    } text-3xl text-primary flex items-center`}
                                ></i>
                            )}

                            <div className="flex flex-col justify-between">
                                <p className="text-xs">
                                    {currentWeather &&
                                        getConditionDetails(
                                            currentWeather.weather_code
                                        )[0]}
                                </p>
                                <p className="text-xs">
                                    <span className="font-bold">H:</span>{" "}
                                    {destinationCurrentDay &&
                                    forecastWeather &&
                                    destinationCurrentDay in forecastWeather
                                        ? forecastWeather[destinationCurrentDay]
                                              .max
                                        : "-"}
                                    º <span className="font-bold">L:</span>
                                    {destinationCurrentDay &&
                                    forecastWeather &&
                                    destinationCurrentDay in forecastWeather
                                        ? forecastWeather[destinationCurrentDay]
                                              .min
                                        : "-"}
                                    º
                                </p>
                            </div>
                        </div>
                        <p className="font-bold flex items-center justify-center flex-col text-3xl">
                            {currentWeather
                                ? currentWeather.temperature_2m
                                : "-"}
                            º
                        </p>
                    </div>
                    <div className="w-full flex flex-row h-full gap-3">
                        {forecastWeather && generateWeather()}
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-1/2 p-3">
                <div className="bento flex flex-col">
                    <div className="w-4/5 self-end mb-1 text-xs">
                        Ethan P., Sydney AU
                    </div>
                    <div className="flex flex-row items-end justify-between">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="person"
                        />
                        <span className="text-xs w-4/5 bg-gray-100 p-2 rounded-t-lg rounded-br-lg shadow-lg">
                            An unforgettable experience! The perfect mix of
                            adventure, stunning views, and relaxation. From
                            booking to travel, JetSet made the experience so
                            smooth!
                        </span>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-primary flex flex-row w-min text-xl">
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star"></i>
                            <i className="fi fi-ss-star-sharp-half-stroke"></i>
                        </div>
                        <div className="text-xs text-gray-600">
                            Rated 4.7 | 1,284 reviews
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-2/4 h-1/2 p-3">
                <div className="bento"></div>
            </div>
            <div className="w-1/4 h-1/2 p-3">
                <div className="bento"></div>
            </div>
        </div>
    );
};

export default BentoLayout;

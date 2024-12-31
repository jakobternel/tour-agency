import Papa from "papaparse";
import Fuse from "fuse.js";

import csvFile from "../data/airports.csv";
import { AirportDataType } from "../types/AirportData";
import { getIPData } from "./getIPData";

let airportData: AirportDataType[] | null = null;
let csvLoaded: Promise<void> | null = null;

// Load and parse airports data CSV
const loadAndParseCSV = async (): Promise<void> => {
    if (csvLoaded) {
        return csvLoaded;
    }

    csvLoaded = new Promise((resolve, reject) => {
        try {
            fetch(csvFile)
                .then((csvData) => csvData.text())
                .then((csvText) => {
                    Papa.parse(csvText, {
                        header: true,
                        skipEmptyLines: true,
                        delimiter: ",",
                        complete: (result: { data: AirportDataType[] }) => {
                            airportData = result.data;
                            resolve();
                        },
                        error: (error: any) => {
                            console.error("Error parsing CSV:", error.message);
                            reject(error);
                        },
                    });
                })
                .catch((error: any) => {
                    console.error("Error fetching CSV file:", error.mmessage);
                    reject(error);
                });
        } catch (error: any) {
            console.error("Error loading CSV file:", error.message);
        }
    });

    return csvLoaded;
};

// Handle fuzzy search of airports
export const searchAirports = async (searchTerm: string) => {
    await loadAndParseCSV();

    if (!airportData) {
        console.warn("CSV File Not Parsed");
        return [];
    }

    const iataCodeExtract = searchTerm.split(" - ")[0].trim();

    const genericFuse = new Fuse(airportData, {
        keys: ["iata_code", "name", "municipality"],
        threshold: 0.3,
        includeScore: true,
        isCaseSensitive: false,
        ignoreLocation: true,
    });

    const results = genericFuse.search(searchTerm);

    if (iataCodeExtract !== searchTerm) {
        const iataFuse = new Fuse(airportData, {
            keys: ["iata_code"],
            threshold: 0,
            includeScore: true,
            isCaseSensitive: false,
            ignoreLocation: false,
        });
        const iataResults = iataFuse.search(iataCodeExtract);
        results.push(...iataResults);
    }

    const uniqueResults = Array.from(
        new Map(results.map((item) => [item.item.iata_code, item])).values()
    );

    return uniqueResults.splice(0, 5);
};

// Get closest airport to user's location from IP address
export const getClosestAirport = async (): Promise<
    AirportDataType | {} | null
> => {
    await loadAndParseCSV();

    if (!airportData) {
        console.warn("CSV File Not Parsed");
        return {};
    }

    // Get bounding box coordinates from lat long coordinates using distance to calculate offset
    const getBoundingBox = (
        lat: number,
        lon: number,
        distance: number
    ): { minLat: number; maxLat: number; minLon: number; maxLon: number } => {
        const radius = 6371;
        const deltaLat = (distance / radius) * (180 / Math.PI);
        const deltaLon =
            (distance / (radius * Math.cos((lat * Math.PI) / 180))) *
            (180 / Math.PI);

        return {
            minLat: lat - deltaLat,
            maxLat: lat + deltaLat,
            minLon: lon - deltaLon,
            maxLon: lon + deltaLon,
        };
    };

    // Calculate euclidian distance between user's IP address location and airport coordinates
    const calculateEuclideanDistance = (
        target: [number, number],
        airportCoordinates: [number, number]
    ) => {
        const latChange = airportCoordinates[0] - target[0];
        const lonChange = airportCoordinates[1] - target[1];

        return Math.sqrt(latChange ** 2 + lonChange ** 2);
    };

    // Function to return single closest airport to user's IP address location
    const getClosestAirport = async (
        lat: number,
        lon: number,
        size = 100
    ): Promise<AirportDataType | null> => {
        const { minLat, maxLat, minLon, maxLon } = getBoundingBox(
            lat,
            lon,
            size
        );

        // Filter list of airports to find sublist of airports which call within bounding box
        const airportsList = airportData!.filter((airport) => {
            const [lat, lon] = airport.coordinates.split(", ").map(Number);

            return (
                lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon
            );
        });

        // If no airports are found in bounding box, retry with bounding box expanded by 100km
        if (airportsList.length === 0) {
            return getClosestAirport(lat, lon, size + 100);
        }

        // Return if only a single airport is found within bounding box
        if (airportsList.length === 1) {
            return airportsList[0];
        }

        // If multiple airports are found in bounding box, find closest one to user's IP address location using euclidian distance calculation
        let closestAirport: AirportDataType = airportsList[0];
        let closestDistance: number = calculateEuclideanDistance(
            [lat, lon],
            airportsList[0].coordinates.split(", ").map(Number) as [
                number,
                number
            ]
        );

        airportsList.slice(1).forEach((airport: AirportDataType) => {
            const distance = calculateEuclideanDistance(
                [lat, lon],
                airport.coordinates.split(", ").map(Number) as [number, number]
            );

            if (distance < closestDistance) {
                closestAirport = airport;
                closestDistance = distance;
            }
        });

        return closestAirport;
    };

    try {
        // Get IP address data and estimated lat lon coordinates. Throw error if API call unsuccessful
        const ipData = await getIPData();

        return await getClosestAirport(ipData.lat, ipData.lon);
    } catch (error: any) {
        console.error(
            "Error getting user lat, lon coordinates: ",
            error.message
        );
        return null;
    }
};
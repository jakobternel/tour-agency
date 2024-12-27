import Papa from "papaparse";
import Fuse from "fuse.js";

import csvFile from "../data/airports.csv";

type AirportDataType = {
    ident: string;
    type: string;
    name: string;
    continent: string;
    iso_country: string;
    iso_region: string;
    municipality: string;
    iata_code: string;
    coordinates: string;
    priority: number;
}[];

let airportData: AirportDataType | null = null;

// Load and parse airports data CSV
const loadAndParseCSV = async (): Promise<void> => {
    try {
        const csvData = await fetch(csvFile);
        const csvText = await csvData.text();

        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            delimiter: ",",
            complete: (result: { data: AirportDataType }) => {
                airportData = result.data;
            },
            error: (error: any) => {
                console.error("Error parsing CSV:", error.message);
            },
        });
    } catch (e) {
        console.error("Error fetching CSV file:", e);
    }
};

loadAndParseCSV();

// Handle fuzzy search of airports
const searchAirports = async (searchTerm: string) => {
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

export default searchAirports;

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import type { Feature, LineString, Point } from "geojson";
import { useEffect, useRef } from "react";
import {
    ItineraryContent,
    LineFeature,
    PointFeature,
} from "../types/InputData";

const Map: React.FC<{ data: ItineraryContent; mapCentrePoint: number[] }> = ({
    data,
    mapCentrePoint,
}) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        const getBoundingBox = (): [
            mapboxgl.LngLatLike,
            mapboxgl.LngLatLike
        ] => {
            let minLat = Infinity;
            let maxLat = -Infinity;
            let minLng = Infinity;
            let maxLng = -Infinity;

            const compareCoordinates = (lat: number, lng: number) => {
                if (lat < minLat) minLat = lat;
                if (lat > maxLat) maxLat = lat;
                if (lng < minLng) minLng = lng;
                if (lng > maxLng) maxLng = lng;
            };

            data.mapPoints.forEach((mapPoint) => {
                switch (mapPoint.type) {
                    case "point":
                        const [lat, lng] = mapPoint.location;
                        compareCoordinates(lat, lng);

                        break;

                    case "line":
                        const [startLat, startLng] = mapPoint.start;
                        compareCoordinates(startLat, startLng);

                        const [endLat, endLng] = mapPoint.end;
                        compareCoordinates(endLat, endLng);

                        break;

                    default:
                        return;
                }
            });

            return [
                [minLng, minLat],
                [maxLng, maxLat],
            ];
        };

        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;

        if (mapContainerRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/light-v11",
                zoom: 9,
            });

            mapRef.current.scrollZoom.disable();
            mapRef.current.boxZoom.disable();
            mapRef.current.doubleClickZoom.disable();
            mapRef.current.dragPan.disable();
            mapRef.current.dragRotate.disable();
            mapRef.current.keyboard.disable();
            mapRef.current.touchZoomRotate.disable();

            mapRef.current.on("load", async () => {
                const bounds = getBoundingBox();

                mapRef.current!.fitBounds(bounds, { padding: 50, duration: 0 });

                const generatePoint = (id: string): mapboxgl.Layer => {
                    return {
                        id: `${id}-layer`,
                        type: "circle",
                        source: id,
                        paint: {
                            "circle-radius": 4,
                            "circle-color": "#ff4d6d",
                            "circle-stroke-width": 2,
                            "circle-stroke-color": "#ffffff",
                        },
                    };
                };

                const generateLine = (
                    id: string,
                    data: Feature<LineString>,
                    start: [number, number],
                    end: [number, number]
                ): void => {
                    mapRef.current!.addSource(`${id}-source`, {
                        type: "geojson",
                        data: data,
                    });

                    mapRef.current!.addLayer({
                        id: `${id}-layer`,
                        type: "line",
                        source: `${id}-source`,
                        paint: {
                            "line-color": "#ff4d6d",
                            "line-width": 2,
                        },
                    });

                    const midpoint = turf.along(data, turf.length(data) / 2);
                    const bearing = turf.bearing(
                        turf.point(start),
                        turf.point(end)
                    );

                    const arrowWrapper = document.createElement("div");
                    const arrowInner = document.createElement("div");

                    arrowInner.innerHTML = "➤";
                    arrowInner.style.transform = `rotate(${bearing - 90}deg)`;
                    arrowInner.style.fontSize = "20px";
                    arrowInner.style.color = "#ff4d6d";

                    arrowWrapper.appendChild(arrowInner);

                    new mapboxgl.Marker(arrowWrapper)
                        .setLngLat(
                            midpoint.geometry.coordinates as [number, number]
                        )
                        .addTo(mapRef.current!);
                };

                data.mapPoints.forEach(
                    (mapFeature: PointFeature | LineFeature) => {
                        switch (mapFeature.type) {
                            case "point":
                                mapRef.current!.addSource(mapFeature.id, {
                                    type: "geojson",
                                    data: {
                                        type: "FeatureCollection",
                                        features: [
                                            {
                                                type: "Feature",
                                                geometry: {
                                                    type: "Point",
                                                    coordinates: [
                                                        mapFeature.location[1],
                                                        mapFeature.location[0],
                                                    ],
                                                },
                                                properties: {},
                                            },
                                        ],
                                    },
                                });

                                if (mapFeature.main) {
                                    const icon = document.createElement("div");
                                    icon.setAttribute(
                                        "style",
                                        `
                                        display: flex;
                                        flex-direction: column;
                                        top: -2em;
                                    `
                                    );
                                    icon.innerHTML = `<i class="bg-primary p-2 rounded-full fi fi-sr-star-christmas text-white text-xl z-[100]"></i>
                                <div class="absolute bg-primary w-[21px] h-[21px] rotate-45 left-1/2 shadow-2xl -translate-x-1/2 top-1/2 z-[99]"></div>`;

                                    new mapboxgl.Marker(icon)
                                        .setLngLat([
                                            mapFeature.location[1],
                                            mapFeature.location[0],
                                        ])
                                        .addTo(mapRef.current!);
                                } else {
                                    mapRef.current!.addLayer(
                                        generatePoint(mapFeature.id)
                                    );
                                }

                                break;

                            case "line":
                                const startCoordinates: [number, number] = [
                                    mapFeature.start[1],
                                    mapFeature.start[0],
                                ];
                                const endCoordinates: [number, number] = [
                                    mapFeature.end[1],
                                    mapFeature.end[0],
                                ];

                                mapRef.current!.addSource(mapFeature.id, {
                                    type: "geojson",
                                    data: {
                                        type: "FeatureCollection",
                                        features: [
                                            {
                                                type: "Feature",
                                                geometry: {
                                                    type: "Point",
                                                    coordinates: endCoordinates,
                                                },
                                                properties: {},
                                            },
                                        ],
                                    },
                                });

                                mapRef.current!.addLayer(
                                    generatePoint(mapFeature.id)
                                );

                                const baseLine: Feature<LineString> =
                                    turf.lineString([
                                        startCoordinates,
                                        endCoordinates,
                                    ]);

                                if (mapFeature.return) {
                                    const midpoint: Feature<Point> = turf.along(
                                        baseLine,
                                        turf.length(baseLine) / 2
                                    );
                                    const bearing: number = turf.bearing(
                                        turf.point(startCoordinates),
                                        turf.point(endCoordinates)
                                    );

                                    const generateCurvedLine = (
                                        midpoint: Feature<Point>,
                                        offset: number,
                                        bearing: number,
                                        bearingAdjustment: number,
                                        coordinates: [
                                            [number, number],
                                            [number, number]
                                        ]
                                    ): Feature<LineString> => {
                                        const offsetCoordinates =
                                            turf.destination(
                                                midpoint,
                                                offset,
                                                bearing + bearingAdjustment
                                            );

                                        return turf.bezierSpline(
                                            turf.lineString([
                                                coordinates[0],
                                                offsetCoordinates.geometry
                                                    .coordinates,
                                                coordinates[1],
                                            ])
                                        );
                                    };

                                    generateLine(
                                        `${mapFeature.id}-1`,
                                        generateCurvedLine(
                                            midpoint,
                                            10,
                                            bearing,
                                            90,
                                            [startCoordinates, endCoordinates]
                                        ),
                                        startCoordinates,
                                        endCoordinates
                                    );

                                    generateLine(
                                        `${mapFeature.id}-2`,
                                        generateCurvedLine(
                                            midpoint,
                                            10,
                                            bearing,
                                            -90,
                                            [startCoordinates, endCoordinates]
                                        ),
                                        endCoordinates,
                                        startCoordinates
                                    );
                                } else {
                                    generateLine(
                                        `${mapFeature.id}-1`,
                                        baseLine,
                                        startCoordinates,
                                        endCoordinates
                                    );
                                }

                                break;

                            default:
                                return;
                        }
                    }
                );

                mapRef.current!.getCanvas().style.cursor = "default";
            });
        }

        return () => {
            mapRef.current?.remove();
        };
    }, [mapCentrePoint]);

    return (
        <div
            ref={mapContainerRef}
            className="map-container h-[calc(100vh/2)] md:h-full rounded-tr-none rounded-bl-xl rounded-br-xl md:rounded-tr-xl md:rounded-br-xl md:rounded-bl-none"
        />
    );
};

export default Map;

# 🖊️ Customising The Tour Data

The data on this website is fully customisable all within a single `.json` file. You can edit background images, written content, activities, itinerary, map locations, and much more.

This file can be found in [`src/data/tourData.json/`](https://github.com/jakobternel/tour-agency/blob/master/src/data/tourData.json).

## 📁 Basic Structure

The basic structure of the `.json` is an object with multiple elements with string index keys (e.g., "0", "1", "2").

```
{
    "0": {
        // destination 0 data here
    },
    "1": {
        // destination 1 data here
    },
    "2": {
        // destination 2 data here
    },
    ...
}
```

For each destination object, the following sections are required which are explained in more detail in the following sections.

| Field | Screenshot Examples | Documentation Shortcut |
|-|-|-|
|`heroContent`| [Hero Image Component](https://github.com/jakobternel/tour-agency/blob/master/screenshots/hero.png) | [1️⃣ Hero Section Data](#1️⃣-hero-section-data) |
|`bentoContent`| [Bento Component](https://github.com/jakobternel/tour-agency/blob/master/screenshots/bento.png) | [2️⃣ Bento Section Data](#2️⃣-bento-section-data) |
|`destinationInfoContent`| [Destination Information Component](https://github.com/jakobternel/tour-agency/blob/master/screenshots/destination.png) | [3️⃣ Destination Section Data](#3️⃣-destination-section-data) |
|`itineraryContent`| [Itinerary Component](https://github.com/jakobternel/tour-agency/blob/master/screenshots/itinerary.png) | [4️⃣ Itinerary Section Data](#4️⃣-itinerary-section-data) |
|`bookingContent`| [Booking Component](https://github.com/jakobternel/tour-agency/blob/master/screenshots/booking.png) | [5️⃣ Booking Section Data](#5️⃣-booking-section-data) |



## 1️⃣ Hero Section Data

The hero section is the top of the webpage as seen in the screenshot [here](https://github.com/jakobternel/tour-agency/blob/master/screenshots/hero.png).

```
{
    "0": {
        "heroContent": {
            "name": "Germany",
            "heroImageFolderRoute": "germany",
            "defaultImage": "germany_default.png",
            "heroImageNames": [
                "germany_layer1.png",
                "germany_layer2.png",
                "germany_layer3.png",
                "germany_layer4.png",
                "germany_layer5.png"
            ]
        }
        // other destination data
    }
}
```

| Field                    | Type              | Description                          |
|--------------------------|-------------------|--------------------------------------|
| `name`                   | `string`          | Name of destination       |
| `heroImageFolderRoute`   | `string`          | Subfolder holding the hero images. This must be included in the /images/ folder            |
| `defaultImage`           | `string`          | Default image to be displayed on mobile screens |
| `heroImageNames`         | `string[]`        | Array of image names for each layer of the parallax image                 |

### 💡 Layering of Hero Images
Parallax hero image layers are generated dynamically based on their order in the array. The first image in the array will be the top-most image displayed (highest z-index value). Because of this, full screen parallax images should be placed last in the array.

The percentages in the array below represent the percentage of the parallax image that remains and is not transparent.

```
[ 10%, 25%, 50%, 75%, 100% ]
```

## 2️⃣ Bento Section Data

The bento section is the section below the hero image which contains information on the current weather, current time, itinerary, destination highlights, and tour price estimation. A screenshot of this can be seen by clicking [here](https://github.com/jakobternel/tour-agency/blob/master/screenshots/bento.png).

```
{
    "0": {
        // hero content
        "bentoContent": {
            "itinerary": {
                "0": {
                    "icon": "fi-sr-plane-arrival",
                    "content": "Arrive in Munich"
                },
                ...
            },
            "destinationSuggestions": [
                {
                    "title": "Biergarten",
                    "icon": "fi-rr-beer",
                    "description": "Munich's traditional beer gardens (Biergarten) are a major part of Bavarian life. One popular feature of these beer gardens is that you can bring your own food, as long as you buy drinks from the beer hall."
                },
                ...
            ],
            "arrAirport": "MUC",
            "destinationCoords": [48.137154, 11.576124]
        }
        // other destination data
    }
}
```

| Field                    | Type     | Description                          |
|--------------------------|----------|-------------------------------------|
| `itinerary`                   | `custom`          | [Itinerary Overview](#-itinerary-bento-component)       |
| `destinationSuggestions`   | `custom`          | [Destination Suggestions](#-destination-suggestions-content)            |
| `arrAirport`   | `string`          | Arrival airport IATA code used for flight price calculation            |
| `destinationCoords`   | `[number, number]`          | Coordinates of destination used for weather forecasting            |

### 💡 Itinerary Bento Component

The itinerary bento component is able to display up to 5 day's worth of key activities at once.

If more than 5 days are entered, it will cut off the last day and display a "more" button. When clicked, this will navigate the user to the full scrollable itinerary component.

Because of this, if the tour is more than 5 days long, it is suggested to have the fifth and sixth entries left blank as follows:

```
"4": {
    "icon": "",
    "content": ""
},
"5": {
    "icon": "",
    "content": ""
}
```

| Field                    | Type     | Description                          |
|--------------------------|----------|--------------------------------------|
| `icon`                   | `string`          | Flaticon icon name       |
| `content`   | `string`          | Brief description of day            |

### 💡 Itinerary & Destination Suggestions Icons

Icons for the destination suggestions can be sourced from Flaticon's library of UI icons. A list of these can be found by clicking [here](https://www.flaticon.com/uicons/interface-icons).

Please note, there is occasionally an issue with some icons not displaying. This issue does not seem to be unique to this project and I have encountered it on other projects.

### 💡 Destination Suggestions Content

It is recommended to have less content in the destination suggestions section as this can be included in more depth in the full itinerary section. I recommended to limiting to a maximum of two words for the title, and around 30 words for the description.

| Field                    | Type     | Description                          |
|--------------------------|----------|--------------------------------------|
| `title`                   | `string`         | Name/title of activity       |
| `icon`   | `string`         | Flaticon icon name            |
| `description`           | `string`         | Description of activity |

## 3️⃣ Destination Section Data

The destination section provides a brief overview of the destination, including images of attractions and locations. A screenshot of this can be seen by clicking [here](https://github.com/jakobternel/tour-agency/blob/master/screenshots/destination.png).

```
{
    "0": {
        // hero and bento content
        "destinationInfoContent": {
            "country": "Germany",
            "city": "Munich",
            "showCityName": true,
            "tagline": "Where tradition meets tomorrow!",
            "description": [
                ...,
                ...
            ],
            "destinationImages": {
                "0": {
                    "size": "tall",
                    "fileSrc": "https://images.pexels.com/photos/29721184/pexels-photo-29721184/free-photo-of-majestic-new-town-hall-tower-in-munich.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                },
                ...
            }
        }
        // other destination data
    }
}
```

| Field                    | Type     | Description                          |
|--------------------------|----------|--------------------------------------|
| `country`                   | `string`          | Country tour is primarily in       |
| `city`   | `string`         | City the tour is in. If tour is across multiple cities, leave blank            |
| `showCityName`   | `boolean`        | If city is left blank and not to be displayed on destination information component, set to `false`.            |
| `description`   | `string[]`         | Array of strings for description of destination. Each paragraph should be a separate string in array.            |
| `destinationImages`   | `custom`          | [Images](#-images)            |

### 💡 Images

In this section you are able to display up to 6 unique images. Images have a size attribute of either `short` or `tall`. Tall images take up the space of 2 short images.

```
"destinationImages": {
    "0": {
        "size": "tall",
        "fileSrc": "https://images.pexels.com/photos/29721184/pexels-photo-29721184/free-photo-of-majestic-new-town-hall-tower-in-munich.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    "1": {
        "size": "short",
        "fileSrc": "https://images.pexels.com/photos/187854/pexels-photo-187854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    "2": {
        "size": "short",
        "fileSrc": "https://images.pexels.com/photos/221519/pexels-photo-221519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    "3": {
        "size": "tall",
        "fileSrc": "https://images.pexels.com/photos/29719841/pexels-photo-29719841/free-photo-of-frauenkirche-in-munich-with-festive-lights.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
}
```

| Field                    | Type      | Description                          |
|--------------------------|---------|--------------------------------------|
| `size`                   | `string`          | `short` or `tall`      |
| `fileSrc`   | `string`         | Source of image to be shown           |

## 4️⃣ Itinerary Section Data

The itinerary section displays detailed information on the tour's itinerary. It contains titles and descriptions for each day of the tour, as well as containing inclusions, exclusions, accommmodation information, and meals.

This section also includes information on the map features to be displayed.

A screenshot of this section can be seen by clicking [here](https://github.com/jakobternel/tour-agency/blob/master/screenshots/itinerary.png).

```
{
    "0": {
        // hero, bento, and destination content
        "itineraryContent": {
            "mapPoints": [
                {
                    "type": "point",
                    "id": "munich",
                    "location": [48.137154, 11.576124],
                    "main": true
                },
                ...
            ],
            "itinerary": {
                "0": {
                    "title": "Arrive in Munich",
                    "description": [
                        ...
                    ],
                    "inclusions": [
                        "Airport Transfers",
                        "Free Time",
                        "Group Dinner"
                    ],
                    "suggestions": ["BMW Museum Tour", "Bar Crawl"],
                    "accommodation": "Private Room in 4* Bavaria Luxe Retreat",
                    "meals": "Breakfast, Lunch, Dinner",
                    "budget": "$50-$75"
                },
                ...
            }
        }
        // other destination data
    }
}
```

| Field                    | Type      | Description                          |
|--------------------------|----------|--------------------------------------|
| `mapPoints`                   | `custom`          | [Map Points](#-map-points)      |
| `itinerary`   | `custom`          | [Itinerary](#-itinerary)           |

### 💡 Map Points

This section holds data used for the calculation and display of the tour map. The bounds of the map are automatically calculated based on the locations entered in this array.

This array can contain any number of `point` or `line` elements.

```
"mapPoints": [
    {
        "type": "point",
        "id": "munich",
        "location": [48.137154, 11.576124],
        "main": true
    },
    {
        "type": "line",
        "id": "castle",
        "start": [48.137154, 11.576124],
        "end": [47.5576, 10.7498],
        "return": true
    }
],
```

#### Point Feature

Point features represent a single point on a map. These can be classified as a main point, or as a regular point. It is recommended to only have the start/end points of the tour as a main point for visual clarity.

| Field                    | Type      | Description                          |
|--------------------------|----------|--------------------------------------|
| `type`                   | `point`          | `point` map feature     |
| `id`   | `string`          | Unique ID for the map feature           |
| `location`   | `[number, number]`          | Coordinates for point map feature           |
| `main`   | `boolean`          | Declare if the map point is a main feature. Will be displayed with a different icon on map.           |

#### Line Feature

Line features will display the direction of travel with an arrow placed on the line. By changing `return` to `true`, it will generate two curved lines with arrows placed on each one showing the direction of travel.

| Field                    | Type      | Description                          |
|--------------------------|----------|--------------------------------------|
| `type`                   | `line`          | `line` map feature     |
| `id`   | `string`          | Unique ID for the map feature           |
| `start` | `[number, number]` | Start point of line feature |
| `end` | `[number, number]` | End point of line feature |
| `return` | `boolean` | Declare whether the line should be for a one-way or return trip |


### 💡 Itinerary

An object of string index keys to display information about tour itinerary.

```
"0": {
    "title": "Arrive in Munich",
    "description": [
        ...
    ],
    "inclusions": [
        "Airport Transfers",
        "Free Time",
        "Group Dinner"
    ],
    "suggestions": ["BMW Museum Tour", "Bar Crawl"],
    "accommodation": "Private Room in 4* Bavaria Luxe Retreat",
    "meals": "Breakfast, Lunch, Dinner",
    "budget": "$50-$75"
}
```

| Field                    | Type      | Description                          |
|--------------------------|----------|--------------------------------------|
| `title`                   | `string`          | Title of day. Automatically prepended with `Day x:`     |
| `description`   | `string[]`          | Array of strings to display description of day. Separate strings will be displayed on separate lines.           |
| `inclusions` | `string[]` | List of inclusions for the day |
| `suggestions` | `string[]` | List of suggestions for the day |
| `accommodation` | `string` | Name of accommodation for the day |
| `meals` | `string` | Meals which are included for the day |
| `budget` | `string` | Estimated budget for the day |

## 5️⃣ Booking Section Data

This section holds information used to assist with the booking process of a tour. Additional activities are listed with prices and their day as well as information on the accommodation options.

```
"bookingContent": {
    "basePrice": 1350,
    "defaultHotel": 0,
    "hotelContent": {
        "0": {
            "name": "Basic Private Room",
            "dailyAdditionalPrice": 0
        },
        ...
    },
    "displayOptionalActivitiesByDay": false,
    "optionalActivities": [
        { "id": 0, "day": 0, "name": "BMW Museum Tour", "cost": 25 },
        ...
    ]
}
```

| Field                    | Type      | Description                          |
|--------------------------|----------|--------------------------------------|
| `basePrice`                   | `number`          | Base price of the tour. This is the minimum price before flight, activity, and accommodation surcharges     |
| `defaultHotel`   | `number`          | Accomodation index for default accommodation type           |
| `hotelContent` | `custom` | [Hotel Options](#-hotel-options) |
| `displayOptionalActivitiesByDay` | `boolean` | Set to `true` if optional activities should be displayed by day. Set to `false` if all optional activities should be shown. |
| `optionalActivities` | `custom` | [Optional Activities](#-optional-activities) |

### 💡 Hotel Options

An object containing string index keys for different types of accommodation

```
"hotelContent": {
    "0": {
        "name": "Basic Private Room",
        "dailyAdditionalPrice": 0
    },
    "1": {
        "name": "Premier Private Room",
        "dailyAdditionalPrice": 50
    },
    "2": {
        "name": "Private Suite",
        "dailyAdditionalPrice": 100
    }
}
```

| Field                    | Type      | Description                          |
|--------------------------|----------|--------------------------------------|
| `name`                   | `string`          | Name of the accommodation update. E.g., Base Room, Premier Room, Premium Room     |
| `dailyAdditionalPrice`   | `number`          | Additional daily price of room upgrade           |

### 💡 Optional Activities

An array of optional activities that can be selected when booking the tour

```
"optionalActivities": [
    { "id": 0, "day": 0, "name": "BMW Museum Tour", "cost": 25 },
    { "id": 1, "day": 0, "name": "Bar Crawl", "cost": 0 },
    { "id": 2, "day": 1, "name": "Bavarian Cooking Class", "cost": 50 },
    { "id": 3, "day": 1, "name": "Football Match", "cost": 50 },
    { "id": 4, "day": 2, "name": "Brewery Tour", "cost": 10 },
    { "id": 5, "day": 2, "name": "Horse Drawn Carriage", "cost": 20 },
    { "id": 6, "day": 3, "name": "Boat Tour on the River Pegnitz", "cost": 50 },
    { "id": 7, "day": 3, "name": "Nuremberg Zoo", "cost": 25 }
]
```

| Field                    | Type      | Description                          |
|--------------------------|----------|--------------------------------------|
| `id`                   | `number`          | Index ID of activity     |
| `dailyAdditionalPrice`   | `number`          | Day the optional activity occurs on           |
| `name`   | `string`          | Name of additional activity           |
| `cost`   | `number`          | Additional cost of activity           |
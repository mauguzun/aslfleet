import { Aircraft, Location } from "./aircrafts";

export const aircrafts: Aircraft[] = [
    {
        id: '1122',
        flightNum: '12AAA',
        type: 'Airbus',
        isMoving: true,
        isVisible: true,
        from: {
            title: 'Суарес  Аэропорт',
            location: new Location(40.4335375, -3.7441733),
            iata: '4NE0',
            country: 'Spain',
        },
        to: {
            title: 'Berlin-Tegel Airport (TXL), Saatwinkler Damm, Berlin',
            location: new Location(52.5588359, 13.2862487),
            iata: 'TXL',
            country: 'Germany',


        },
        location: new Location(51.562893534257476, 12.47235374920594)
    },
    {
        id: '2211',
        flightNum: '12-ACDS',
        type: 'Boeing 737',
        isMoving: true,
        isVisible: true,
        from: {
            title: 'Berlin-Tegel Airport (TXL), Saatwinkler Damm, Berlin',
            location: new Location(52.5588359, 13.2862487),
            iata: 'TXL',
            country: 'Germany',


        },
        to: {
            title: 'London Luton Airport',
            location: new Location(51.874698638916016, -0.36833301186561584),
            iata: 'EGGW',
            country: 'UK',


        },
        location: new Location(51.12368896781216, 0.69500999920594)
    },
    {
        id: '3333',
        flightNum: '12AFD',
        type: 'Boeing 737',
        isMoving: true,
        isVisible: true,
        from: {
            title: 'Genève Aéroport (GVA), Route de l\'Aéroport',
            location: new Location(46.2370134,6.1069677),
            iata: 'GVA',
            country: 'Geneva',
        },
        to: {
            title: 'Berlin-Tegel Airport (TXL), Saatwinkler Damm, Berlin',
            location: new Location(52.5588359, 13.2862487),
            iata: 'TXL',
            country: 'Germany',


        },


        location: new Location(47.98936313770509, 10.45086937420594)
    },

    {
        id: '4444',
        flightNum: '4 AFD',
        type: 'Boeing 737',
        isMoving: true,
        isVisible: true,
        from: {
            title: 'London Luton Airport',
            location: new Location(51.874698638916016, -0.36833301186561584),
            iata: 'EGGW',
            country: 'UK',
        },
        to: {
            title: 'Warsaw',
            location: new Location(52.2330269,20.7810092),
            iata: 'POL',
            country: 'Poland',


        },
        location: new Location(50.62454363340668, 19.81122093670594)
    },
    {
        id: '0005',
        flightNum: '5 AFD',
        type: 'Boeing 737',
        isMoving: true,
        isVisible: true,
        from: {
            title: 'London Luton Airport',
            location: new Location(51.874698638916016, -0.36833301186561584),
            iata: 'EGGW',
            country: 'UK',
        },
        to: {
            title: 'Budapest  ',
            location: new Location(47.4384623,19.2501071),
            iata: 'Bud',
            country: 'Hungary',


        },
        location: new Location(50.62454363340668, 5.88055687420594)
    },

    {
        id: '0006',
        flightNum: '6 AFD',
        type: 'Boeing 737',
        isMoving: true,
        isVisible: true,
        from: {
            title: 'London Luton Airport',
            location: new Location(51.874698638916016, -0.36833301186561584),
            iata: 'EGGW',
            country: 'UK',
        },
        to: {
            title: 'Milan',
            location: new Location(45.5610117,8.9343914),
            iata: 'MLN',
            country: 'Italy',


        },
        location: new Location(45.0263606174663, 6.18817406170594)
    }
];
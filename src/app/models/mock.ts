import { Aircraft, Location, FlightInfo } from "./aircrafts";

const airport = new Map();
airport.set('Milan', {
    title: 'Milan',
    location: new Location(45.5610117, 8.9343914),
    iata: 'MLN',
    country: 'Italy'
});

airport.set('Budapest', {
    title: 'Budapest',
    location: new Location(47.4384623, 19.2501071),
    iata: 'Bud',
    country: 'Hungary',
});
airport.set('Luton', {
    title: 'London Luton Airport',
    location: new Location(51.874698638916016, -0.36833301186561584),
    iata: 'EGGW',
    country: 'UK',
});

airport.set('Warsaw', {
    title: 'Warsaw',
    location: new Location(52.2330269, 20.7810092),
    iata: 'POL',
    country: 'Poland',
});
airport.set('Berlin', {
    title: 'Berlin-Tegel Airport (TXL), Saatwinkler Damm, Berlin',
    location: new Location(52.5588359, 13.2862487),
    iata: 'TXL',
    country: 'Germany',
});
airport.set('Geneva', {
    title: 'Genève Aéroport (GVA), Route de l\'Aéroport',
    location: new Location(46.2370134, 6.1069677),
    iata: 'GVA',
    country: 'Switzeralnd',
});
airport.set('Suares', {
    title: 'Suares',
    location: new Location(40.4335375, -3.7441733),
    iata: '4NE0',
    country: 'Spain',
});


export const aircrafts: Aircraft[] = [


    {
        id: '1122',
        flightInfo: new FlightInfo('AS1234', airport.get('Suares'), airport.get('Berlin'), new Date(), new Date()),
        type: 'Airbus',
        isMoving: true,

     
        location: new Location(51.562893534257476, 12.47235374920594)

      

        
        //0.99594236574
        //0.81
    },
    {
        id: '2211',
        flightInfo: new FlightInfo('AS3213', airport.get('Berlin'), airport.get('Luton'), new Date(), new Date()),

        type: 'Boing 737',
        isMoving: true,


        location: new Location(51.12368896781216, 0.69500999920594)
    },
    {
        id: '3333',
        flightInfo: new FlightInfo('AAADSF', airport.get('Geneva'), airport.get('Berlin'), new Date(), new Date()),

        type: 'Boeing 737',
        isMoving: true,



        location: new Location(47.98936313770509, 10.45086937420594)
    },

    {
        id: '4444',
        flightInfo: new FlightInfo('ASDA', airport.get('Luton'), airport.get('Warsaw'), new Date(), new Date()),

        type: 'Boeing 737',
        isMoving: true,


        location: new Location(50.62454363340668, 19.81122093670594)
    },
    {
        id: '0005',
        flightInfo: new FlightInfo('asdasd', airport.get('Luton'), airport.get('Budapest'), new Date(), new Date()),

        type: 'Boeing 737',
        isMoving: true,



        location: new Location(50.62454363340668, 5.88055687420594)
    },
    {
        id: '007',

        type: 'Boeing 737',
        isMoving: false,
        location: new Location(51.62454363340668, 5.28055687420594)
    },
];






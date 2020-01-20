
export interface Aircraft {
    id: string;
    type: string;

    flightInfo?: FlightInfo;
    isMoving: boolean;
    location: Location;
    history?: Location[];
}

export interface Airport {
    iata: string;
    country: string;
    title: string;
    location: Location;
    address?: string;
}


export class FlightInfo {
    public flightNum: string;
    public from: Airport;
    public to: Airport;
    public start: Date;
    public stop: Date;
    public charter = false;

    constructor(flightNum: string, from: Airport, to: Airport, start?: Date, stop?: Date) {
        this.flightNum = flightNum;
        this.from = from;
        this.to = to;
        this.start = start;
        this.stop = stop;
    }
}




export class Location {

    public lat: number;
    public long: number;

    constructor(lat?: number, long?: number) {

        this.lat = lat;
        this.long = long;

    }



}

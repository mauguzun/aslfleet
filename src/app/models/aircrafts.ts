
export interface Aircraft {
    id: string;
    type: string;
    flightNum: string;
    from?: Airport;
    to?: Airport;
    isMoving: boolean;
    isVisible: boolean;
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


export class Location {

    public lat: number;
    public long: number;

    constructor(lat?: number, long?: number) {
        if (lat && long) {
            this.lat = lat;
            this.long = long;
        }

    }



}

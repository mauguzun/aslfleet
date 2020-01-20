import { Injectable } from '@angular/core';
import { Aircraft } from './models/aircrafts';
import { aircrafts } from './models/mock';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  private base = 'http://map.asl.nl.eu.org/';

  constructor() { }

  getIcon(aricraft: Aircraft) {

    if (!aricraft.isMoving) {
      return this.base + 'assets/boing_stay/n.png';
    }
    const north = aricraft.location.lat - aricraft.flightInfo.to.location.lat;
    const east = aricraft.location.long - aricraft.flightInfo.to.location.long;


    const isNorth = (Math.abs(north) > Math.abs(east));
    if (isNorth) {
      if (north < 0) {
        return this.base + 'assets/boing_fly/n.png';
      } else {
        return this.base + 'assets/boing_fly/s.png';
      }
    } else {
      if (east < 0) {
        return this.base + 'assets/boing_fly/e.png';
      }
    }
    return this.base + 'assets/boing_fly/w.png';
    //  console.log( aricraft.id + ' -  ' +  east + '-' + north);

    // return 'assets/boing_fly/n.png';
  }
}

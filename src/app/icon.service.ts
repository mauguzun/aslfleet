import { Injectable } from '@angular/core';
import { Aircraft } from './models/aircrafts';
import { aircrafts } from './models/mock';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }

  getIcon(aricraft: Aircraft) {

    if (!aricraft.isMoving) {
      return 'assets/boing_stay/n.png';
    }
    const east = aricraft.location.lat - aricraft.flightInfo.to.location.lat;
    const north = aricraft.location.long - aricraft.flightInfo.to.location.long;
    console.log( aricraft.id + ' -  ' +  east + '-' + north);

    return 'assets/boing_fly/n.png';
  }
}

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Aircraft, Airport } from 'src/app/models/aircrafts';
import { aircrafts } from 'src/app/models/mock';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { PageInfoComponent } from '../page-info/page-info.component';


@Component({
  selector: 'app-page-map',
  templateUrl: './page-map.component.html',
  styleUrls: ['./style.less']
})
export class PageMapComponent implements AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

  public aircafts: Aircraft[] = aircrafts;
  public map: google.maps.Map;
  public myControl = new FormControl();
  public showSearch = false;

  private _timeout: 7000;


  public from: Airport = null;
  public to: Airport = null;
  public path: google.maps.Polyline = null;

  public fromMarker;
  public toMarker;

  coordinates = new google.maps.LatLng(48.83524814781229, 2.29901390545594);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 6,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: ['roadmap', 'terrain'], position: google.maps.ControlPosition.BOTTOM_LEFT
    }
  };

  ngAfterViewInit() {
    this.mapInitializer();

  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.setMarker();
  }

  setMarker() {




    const aircafts = this.aircafts;
    aircafts.forEach(item => {

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.location.lat, item.location.long),
        map: this.map, title: item.id, icon: 'assets/30.png'
      });
      google.maps.event.addListener(marker, 'click', () => {
        this.openWindow(marker.getTitle());
      });
      google.maps.event.addListener(marker, 'mouseover', () => {


        if (item.isMoving) {

          if (this.fromMarker) {
            this.fromMarker.setMap(null);
          }
          if (this.toMarker) {
            this.toMarker.setMap(null);
          }
          if (this.path) {
            this.path.setMap(null);
          }



          this.fromMarker = new google.maps.Marker({
            position: new google.maps.LatLng(item.from.location.lat, item.from.location.long),
            title: item.from.iata,
            label: 'A',
            map: this.map,
          });

          this.toMarker = new google.maps.Marker({
            position: new google.maps.LatLng(item.to.location.lat, item.to.location.long),
            title: item.to.iata,
            label: 'B',
            map: this.map,
          });

          this.fromMarker.setMap(this.map);
          this.toMarker.setMap(this.map);
   

          const flightPlanCoordinates = [
            new google.maps.LatLng(item.from.location.lat, item.from.location.long),
            marker.getPosition(),
            new google.maps.LatLng(item.to.location.lat, item.to.location.long),

          ]; 
          this.path = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
          this.path.setMap(this.map);
        }


        let display;
        if (item.isMoving) {
          display = ` id : ${item.id} , fl : ${item.flightNum}
            from  ${item.from.country} ,${item.from.iata} -  to   ${item.to.country},${item.to.iata}`;
        } else {
          display = ` id ${item.id} parking`;
        }
        this.snackBar.open(display, null, {
          duration: this._timeout,
        });
      });
      marker.setMap(this.map);
     
    });
  }
  openWindow(id: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '80%';
    dialogConfig.data = this.aircafts.find(x => x.id === id);
    this.dialog.open(PageInfoComponent, dialogConfig);
  }

  toogleSearch() {
    this.showSearch = !this.showSearch;
    this.fromMarker.setMap(null);
  }

  openAirport(iata: string) {

  }
}





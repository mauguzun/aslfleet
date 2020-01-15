import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Aircraft, Airport } from 'src/app/models/aircrafts';
import { aircrafts } from 'src/app/models/mock';
import { MatSnackBar, MatDialogConfig, MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { PageInfoComponent } from '../page-info/page-info.component';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { tokenName } from '@angular/compiler';
import { PageMapSettingsComponent } from '../page-map-settings/page-map-settings.component';
import { IconService } from 'src/app/icon.service';


@Component({
  selector: 'app-page-map',
  templateUrl: './page-map.component.html',
  styleUrls: ['./style.less']
})
export class PageMapComponent implements OnInit, AfterViewInit {


  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog,
     private icon: IconService) { }

  private _aircaftsList: Aircraft[] = aircrafts;


  public map: google.maps.Map;
  public myControl = new FormControl();
  public showSearch = false;

  private _timeout: 7000;

  aircaftsFiltered: Observable<Aircraft[]>;
  public path: google.maps.Polyline = null;

  public fromMarker;
  public toMarker;

  markers: google.maps.Marker[] = [];



  coordinates = new google.maps.LatLng(48.83524814781229, 2.29901390545594);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    fullscreenControl: null,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.INSET,
      mapTypeIds: ['roadmap', 'terrain'],
      position: google.maps.ControlPosition.BOTTOM_LEFT
    }
  };


  ngAfterViewInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.setMarker();
  }
  ngOnInit(): void {
    this.aircaftsFiltered = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  select(event: MatAutocompleteSelectedEvent) {
    this.filterMapPlane(event.option.value);
  }
  keyup(event) {
    this.filterMapPlane(event.target.value);
  }


  openSettings() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '80%';
    this.dialog.open(PageMapSettingsComponent, dialogConfig);
  }


  private filterMapPlane(id: string) {

    this._clearMap();
    const selected = this._aircaftsList.filter(x => x.id === id);

    if (selected.length > 0) {

      this.markers.forEach(marker => {
        if (selected && marker.getTitle() === id) {
          marker.setVisible(true);
          this.map.setCenter(marker.getPosition());
        } else {
          marker.setVisible(false);
        }
      });

    } else {
      this.markers.forEach(marker => {
        marker.setVisible(true);
      });
      this.map.setCenter(this.coordinates);

    }


  }

  setMarker() {
    this._aircaftsList.forEach(item => {


      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.location.lat, item.location.long), map: this.map, title: item.id,
        icon: this.icon.getIcon(item)

      });

      google.maps.event.addListener(marker, 'click', () => {
        this.openWindow(marker.getTitle());
      });
      google.maps.event.addListener(marker, 'mouseover', () => {

        this._clearMap();
        if (item.isMoving) {


          this.fromMarker = new google.maps.Marker({
            position: new google.maps.LatLng(item.flightInfo.from.location.lat, item.flightInfo.from.location.long),
            title: item.flightInfo.from.iata,
            label: 'A',
            map: this.map,
          });

          this.toMarker = new google.maps.Marker({
            position: new google.maps.LatLng(item.flightInfo.to.location.lat, item.flightInfo.to.location.long),
            title: item.flightInfo.to.iata,
            label: 'B',
            map: this.map,
          });

          this.fromMarker.setMap(this.map);
          this.toMarker.setMap(this.map);


          const flightPlanCoordinates = [
            new google.maps.LatLng(item.flightInfo.from.location.lat, item.flightInfo.from.location.long),
            marker.getPosition(),
            new google.maps.LatLng(item.flightInfo.to.location.lat, item.flightInfo.to.location.long),

          ];
          this.path = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1
          });
          this.path.setMap(this.map);
        }

        this.initOnHover(item)

      });
      marker.setMap(this.map);
      this.markers.push(marker);
    });


  }
  private initOnHover(item: Aircraft) {

    let display = null;
    if (item.isMoving) {
      display = `# ${item.id}  N  ${item.flightInfo.flightNum}   /     ${item.flightInfo.from.iata} ✈ ${item.flightInfo.to.iata} `;
    } else {
      display = `# ${item.id} parking`;
    }
    this.snackBar.open(display, null, {
      duration: this._timeout,
    });
  }

  private _clearMap() {
    if (this.fromMarker) {
      this.fromMarker.setMap(null);
    }
    if (this.toMarker) {
      this.toMarker.setMap(null);
    }
    if (this.path) {
      this.path.setMap(null);
    }

  }

  private _filter(value: string): Aircraft[] {
    const filterValue = value.toLowerCase();
    return this._aircaftsList.filter(option => option.id.toLowerCase().includes(filterValue));
  }




  toogleSearch() {
    this.showSearch = !this.showSearch;
  }

  openWindow(id: string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '80%';
    dialogConfig.data = this._aircaftsList.find(x => x.id === id);
    this.dialog.open(PageInfoComponent, dialogConfig);
  }
}





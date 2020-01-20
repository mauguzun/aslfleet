import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Aircraft } from 'src/app/models/aircrafts';
import { aircrafts } from 'src/app/models/mock';
import { MatSnackBar, MatDialogConfig, MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { PageInfoComponent } from '../page-info/page-info.component';
import { Observable, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PageMapSettingsComponent } from '../page-map-settings/page-map-settings.component';
import { IconService } from 'src/app/icon.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas'
import 'jspdf-autotable';

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

  public inter = interval(2000);

  public map: google.maps.Map;
  public myControl = new FormControl();
  public showSearch = false;
  public loader = false;
  public playTrue = true;

  private _timeout: 7000;

  aircaftsFiltered: Observable<Aircraft[]>;
  public path: google.maps.Polyline = null;

  public fromMarker;
  public toMarker;

  markers: google.maps.Marker[] = [];



  coordinates = new google.maps.LatLng(48.83524814781229, 2.29901390545594);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    fullscreenControl: null,
    disableDefaultUI: true,
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
    this.inter.subscribe(() => {
      this.updateMarkers();
    })
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

    this.markers.forEach(element => {
      element.setMap(null);
    });


    this._aircaftsList.forEach(item => {


      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.location.lat, item.location.long), map: this.map, title: item.id,
        icon: this.icon.getIcon(item),
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

        this.initOnHover(item);

      });
      marker.setMap(this.map);
      this.markers.push(marker);
      this.loader = false;
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

  toPdf() {

    this.loader = true;
    const rows = [];
    let staticMapUrl = 'https://maps.googleapis.com/maps/api/staticmap';

    staticMapUrl += '?center=' + this.map.getCenter().lat() + ',' + this.map.getCenter().lng();
    staticMapUrl += '&size=' + this.gmap.nativeElement.offsetWidth + 'x' + this.gmap.nativeElement.offsetHeight;
    staticMapUrl += '&size=' + this.gmap.nativeElement.offsetWidth + 'x' + this.gmap.nativeElement.offsetHeight;
    staticMapUrl += '&zoom=' + this.map.getZoom();
    staticMapUrl += '&maptype=' + this.map.getMapTypeId();


    let i = 1;
    for (const marker of this.markers) {

      const item = this._aircaftsList.find(x => x.id === marker.getTitle());
      // const icon = this.icon.getIcon(this._aircaftsList.find(x => x.id === marker.getTitle()));
      const color = item.isMoving ? 'red' : 'blue';
      staticMapUrl += '&markers=color:' + color + '|label:' + i + '|' + marker.getPosition().lat() +
        ',' + marker.getPosition().lng();

      if (item.isMoving) {
        rows.push([i, item.id, item.flightInfo.flightNum, item.flightInfo.from.iata, item.flightInfo.to.iata]);
      } else {
        rows.push([i, item.id, '', '', '']);

      }

      i++;
    }


    staticMapUrl += '&key=AIzaSyDpCeA3TkyK4tGxjbKnQWVcXaA3C6SgULM';
    console.log(staticMapUrl);


    this.loadImage(staticMapUrl).then((logo) => {

      const doc = new jsPDF('p', 'mm', 'a4');
      const columns = ['Id', 'Plane Id', 'Flight Number', 'Departue', 'Arrival'];

      doc.setFont("Arial");
      doc.setFontSize(12);

      doc.addImage(logo, 'PNG', 5, 5, 200, 200);
      doc.text('Table with labels and details on secodn page', 5, 220);
      doc.addPage();
      doc.autoTable(columns, rows);
      doc.save(new Date().toLocaleString() + '.pdf');

    }).catch(error => {
      alert(error);
    }).finally(() => {
      this.loader = false;
    });



  }

  updateMarkers() {

    const stepSize = 0.01;
    
    for (const iterator of this._aircaftsList) {

      if (iterator.isMoving) {
        const latStep = iterator.flightInfo.to.location.lat > 0 ? stepSize : -1 * stepSize;
        const longStep = iterator.flightInfo.to.location.long > 0 ? stepSize : -1 * stepSize;


        iterator.location.lat += latStep;
        iterator.location.long += longStep;

        this.markers.find(x=>x.getTitle() === iterator.id ).setPosition(new google.maps.LatLng(iterator.location.lat,iterator.location.long));
      }
    }
  //  this.setMarker();
  }

  loadImage(url: string) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = url;
    });


  }


}



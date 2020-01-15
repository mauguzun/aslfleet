import { Component, OnInit, Inject } from '@angular/core';
import { Aircraft } from 'src/app/models/aircrafts';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.less']
})
export class PageInfoComponent implements OnInit {

  aircraft: Aircraft;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Aircraft) {


    this.aircraft = data;
  }

  ngOnInit() {
  }

}

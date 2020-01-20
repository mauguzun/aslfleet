import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/statistic.service';

@Component({
  selector: 'app-page-statistic',
  templateUrl: './page-statistic.component.html',
  styleUrls: ['./page-statistic.component.less']
})
export class PageStatisticComponent implements OnInit {

  constructor(public service: StatisticService) {

    console.log(this.service.dataArray);
  }

  ngOnInit() {
  }

}

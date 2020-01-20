import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { PageMapComponent } from './pages/page-map/page-map.component';
import { PageTablesComponent } from './pages/page-tables/page-tables.component';
import { PageStatisticComponent } from './pages/page-statistic/page-statistic.component';


const routes: Routes = [

  {

    path: '', component: BaseLayoutComponent, children: [
      { path: '', component: PageMapComponent },
      { path: 'table', component: PageTablesComponent },
      { path: 'stat', component: PageStatisticComponent },
    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

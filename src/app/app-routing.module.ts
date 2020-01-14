import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { PageMapComponent } from './pages/page-map/page-map.component';


const routes: Routes = [

  {

    path: '', component: BaseLayoutComponent, children: [
      { path: '', component: PageMapComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

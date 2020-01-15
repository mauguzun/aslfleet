import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { PageMapComponent } from './pages/page-map/page-map.component';
import { PageTablesComponent } from './pages/page-tables/page-tables.component';

import {
  MatButtonModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatExpansionModule,
  MatMenuModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatDialog,
  MatDialogModule
} from '@angular/material';
import { PageInfoComponent } from './pages/page-info/page-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageMapSettingsComponent } from './pages/page-map-settings/page-map-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    PageMapComponent,
    PageTablesComponent,
    PageInfoComponent,
    PageMapSettingsComponent
  ],
  imports: [
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    MatExpansionModule,
    BrowserAnimationsModule, MatMenuModule, MatFormFieldModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PageInfoComponent,PageMapSettingsComponent]

})
export class AppModule { }

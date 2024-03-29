import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromRoot from './store';
import { CanvasModule } from './canvas/canvas.module';
import { DataTableComponent } from './data-table/data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './common/app-material.module';
import { GraphComponent } from './graph/graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OptionsComponent } from './options/options.component';
import { ExporterComponent } from './exporter/exporter.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    GraphComponent,
    OptionsComponent,
    ExporterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppMaterialModule,
    StoreModule.provideStore(fromRoot.reducer),
    CanvasModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RoutesService } from './routes-list/routes.service';

import { AppComponent } from './app.component';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { MimicService } from './shared/mimic.service';
import { RouteDetailsComponent } from './route-details/route-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutesListComponent,
    RouteDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    RoutesService,
    MimicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

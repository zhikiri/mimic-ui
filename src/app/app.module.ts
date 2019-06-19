import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutesService } from './routes-list/routes.service';

import { AppComponent } from './app.component';
import { RoutesListComponent } from './routes-list/routes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutesListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    RoutesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

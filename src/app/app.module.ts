import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { RouteListItemComponent } from './routes-list/route-list-item/route-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutesListComponent,
    RouteListItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

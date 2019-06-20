import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { RoutesService } from './routes-list/routes.service';

import { AppComponent } from './app.component';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { MimicService } from './shared/mimic.service';
import { RouteDetailsComponent } from './route-details/route-details.component';

const appRoutes: Routes = [
  { path: 'route/:id', component: RouteDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RoutesListComponent,
    RouteDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [
    RoutesService,
    MimicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

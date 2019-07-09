import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AceModule, ACE_CONFIG, AceConfigInterface } from 'ngx-ace-wrapper';

import { RoutesService } from './routes-list/routes.service';

import { AppComponent } from './app.component';
import { RoutesListComponent } from './routes-list/routes-list.component';
import { MimicService } from './shared/mimic.service';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { MethodSelectComponent } from './route-details/method-select/method-select.component';

const DEFAULT_ACE_CONFIG: AceConfigInterface = { tabSize: 2 };

const appRoutes: Routes = [
  { path: 'route/:id', component: RouteDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RoutesListComponent,
    RouteDetailsComponent,
    MethodSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AceModule,
    ReactiveFormsModule
  ],
  providers: [
    RoutesService,
    MimicService,
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

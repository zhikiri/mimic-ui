import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AceModule, ACE_CONFIG, AceConfigInterface } from 'ngx-ace-wrapper';

import ApiService from './shared/api.service';
import MocksService from './shared/mocks.service';

import { AppComponent } from './app.component';
import { MocksListComponent } from './mocks-list/mocks-list.component';
import { MockComponent } from './mock/mock.component';
import { MethodSelectComponent } from './mock/method-select/method-select.component';

const DEFAULT_ACE_CONFIG: AceConfigInterface = { tabSize: 2 };

const appRoutes: Routes = [
  { path: 'mocks/:hash', component: MockComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MocksListComponent,
    MockComponent,
    MethodSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AceModule,
    FormsModule
  ],
  providers: [
    ApiService,
    MocksService,
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

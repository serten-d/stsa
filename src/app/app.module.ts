import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BeersComponent } from './beers/beers.component';
import { BewersComponent } from './bewers/bewers.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BeersComponent,
    data: { title: 'Beer List' }
  },
  {
    path: 'beers/:id',
    component: BeerDetailsComponent,
    data: { title: 'beer Details' }
  },
  {
    path: 'bewer',
    component: BewersComponent,
    data: { title: 'bewer Add' }
  }
];
@NgModule({
  declarations: [
    AppComponent,
    BeersComponent,
    BewersComponent,
    BeerDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

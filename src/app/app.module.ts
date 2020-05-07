import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { WeatherPanelComponent } from './weather-panel/weather-panel.component';
import { WeatherDataService } from './weather-data.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    HttpClientModule
  ],
  providers: [WeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

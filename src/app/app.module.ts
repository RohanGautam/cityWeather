import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule, NbButtonModule, NbSpinnerModule, NbActionsModule, NbTooltipModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { WeatherPanelComponent } from './weather-panel/weather-panel.component';
import { WeatherDataService } from './weather-data.service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from "@angular/common";
import { OnlineOfflineService } from './online-offline.service';

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
    NbInputModule,
    NbIconModule,
    NbFormFieldModule,
    NbButtonModule,
    NbSpinnerModule,
    HttpClientModule,
    FormsModule,
    NbActionsModule,
    NbTooltipModule,
    NbToastrModule.forRoot()
  ],
  providers: [WeatherDataService, JsonPipe, OnlineOfflineService],
  bootstrap: [AppComponent]
})
export class AppModule { }

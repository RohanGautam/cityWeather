import { Component } from '@angular/core';
import { WeatherDataService } from './weather-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cityWeather';
  weatherComponentIds = Array(9).fill(null);

  constructor(public wdObj: WeatherDataService){    
  }

  clearIndexedDb(){
    this.wdObj.clearIndexDb();
  }
}

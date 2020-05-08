import { Component } from '@angular/core';
import { WeatherDataService } from './weather-data.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cityWeather';
  weatherComponentIds = Array(9).fill(null);

  constructor(private toastrService: NbToastrService, private wdObj: WeatherDataService){    
  }

  clearIndexedDb(){
    this.wdObj.clearIndexDb();
    this.showToast('top-right','success','Cleared IndexedDb cache','Current data will not be persisted')
  }

  showToast(position, status, title, description) {
    this.toastrService.show(
      description,
      `${title}`,
      { position, status });
  }
}

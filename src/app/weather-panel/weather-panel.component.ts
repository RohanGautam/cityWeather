import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.scss']
})
export class WeatherPanelComponent implements OnInit {

  constructor(public wdObj:WeatherDataService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    console.log(await this.wdObj.getData("Bangalore"))
  }

}

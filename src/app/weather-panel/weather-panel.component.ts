import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.scss']
})
export class WeatherPanelComponent implements OnInit {

  weatherData:any;
  wantToSearch:boolean=false;
  validResponse:boolean=false;
  cityInput:string;

  constructor(public wdObj:WeatherDataService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    this.weatherData = await this.wdObj.getData("Bangalore")
    let statusCode:number = this.weatherData['cod']
    if(statusCode==200){
      this.validResponse=true
    }
  }

  search(){
    console.log(this.cityInput);
  }

  showSearchBar(){
    this.wantToSearch = true;
  }

}

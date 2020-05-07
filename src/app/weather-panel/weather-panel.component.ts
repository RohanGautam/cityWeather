import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.scss']
})
export class WeatherPanelComponent implements OnInit {

  weatherData;
  wantToSearch:boolean=false;
  searching:boolean=false;
  validResponse:boolean=false;
  cityInput:string;

  mainWeatherType:string;

  constructor(public wdObj:WeatherDataService) { }

  ngOnInit(): void {
    // this.getData();
  }

  async getData(cityName:string){
    
    this.weatherData = await this.wdObj.getData(cityName)    
    let statusCode:number = this.weatherData['cod']
    if(statusCode==200){
      this.validResponse=true;
      console.log(this.weatherData);
      this.mainWeatherType=this.weatherData['weather'][0]['main'];
      console.log(this.mainWeatherType);      
    } 
  }

  async search(){
    console.log(this.cityInput);
    this.validResponse=false;
    this.searching=true;    
    await this.getData(this.cityInput);
    this.searching=false;
  }

  showSearchBar(){
    this.wantToSearch = true;
  }

}

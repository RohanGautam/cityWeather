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

  // image mapping - make class?
  imageMap = {
    'Clouds': 'assets/images/weather/clouds.png',
    'Clear': 'assets/images/weather/windy.png',
    'Snow': 'assets/images/weather/snow.png',
    'Rain': 'assets/images/weather/umbrellas.png',
    'Drizzle': 'assets/images/weather/umbrellas.png',
    'ThunderStorm': 'assets/images/weather/storm.png',
    'Tornado': 'assets/images/weather/tornado.png',
    'Haze': 'assets/images/weather/wind-4.png',
    'Fog': 'assets/images/weather/snowing.png',
    'Dust': 'assets/images/weather/dust.png',
    'Sand': 'assets/images/weather/dust.png',
    'Mist': 'assets/images/weather/mist.png',
  }
  
  // encapsulate in interface
  mainWeatherType:string;
  iconId:string;

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
      this.iconId=this.weatherData['weather'][0]['icon'];
      console.log(this.iconId);      
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

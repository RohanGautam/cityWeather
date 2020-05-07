import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { WeatherResponse } from '../weatherResponse';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.scss']
})
export class WeatherPanelComponent implements OnInit {

  weatherData;
  wantToSearch:boolean=false;
  fromCard:boolean=false;
  searching:boolean=false;
  errorInInput:boolean=false;
  validResponse:boolean=false;
  cityInput:string;

  placeholderPath="assets/images/placeholder.png"

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
  weatherDataObj : WeatherResponse;
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
      // this.weatherDataObj.main = this.weatherData['weather'][0]['main'];
      // this.weatherDataObj.icon = this.imageMap[this.weatherDataObj.main];
      // this.weatherDataObj.name = this.weatherData['name'];
      // this.weatherDataObj.tempMax = this.weatherData['main']['temp_max'];
      // this.weatherDataObj.tempMin = this.weatherData['main']['temp_min'];

      this.mainWeatherType=this.weatherData['weather'][0]['main'];
      this.iconId=this.weatherData['weather'][0]['icon'];
      console.log(this.iconId);     
      console.log(this.iconId);     
      this.wantToSearch=false; 
      this.errorInInput=false;
    } else{
      this.errorInInput=true;
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
    this.fromCard=true;
  }

  edit(){
    this.wantToSearch= !this.wantToSearch;
    this.validResponse=!this.validResponse;
  }


}

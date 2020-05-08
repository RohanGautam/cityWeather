import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from './weatherResponse';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private APIkey : string ="8cc6aaa67b474fd136057f0d738cbad3"
  private dataRecieved;
  weatherData:WeatherResponse;

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

  constructor(private http: HttpClient) {}
  
  private callAPI(cityName:string){
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.APIkey}`
    return this.http.get(url);
  }

  async getData(cityName:string):Promise<WeatherResponse>{
    try{
      this.dataRecieved = await this.callAPI(cityName).toPromise();
      this.weatherData = {
        cityName : this.dataRecieved['name'],
        main : this.dataRecieved['weather'][0]['main'],
        description : this.dataRecieved['weather'][0]['description'],
        imageUrl : this.imageMap[this.dataRecieved['weather'][0]['main']],
        tempMax: (this.dataRecieved['main']['temp_max'] - 273.15).toFixed(2),
        tempMin: (this.dataRecieved['main']['temp_min'] - 273.15).toFixed(2),
        code: this.dataRecieved['cod']
      }
      // return this.dataRecieved;
      return this.weatherData;
    } catch(error){
      this.weatherData = {
        cityName:null,
        main:null,
        description:null,
        imageUrl:null,
        tempMax:null,
        tempMin:null,
        code:error.status
      }
      // return {'cod': error.status};
      return this.weatherData;
    }
  }
}

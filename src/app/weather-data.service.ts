import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private APIkey : string ="8cc6aaa67b474fd136057f0d738cbad3"
  dataRecieved;

  constructor(private http: HttpClient) {}
  
  private callAPI(cityName:string){
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.APIkey}`
    return this.http.get(url);
  }

  async getData(cityName:string){
    this.dataRecieved = await this.callAPI(cityName).toPromise();
    return this.dataRecieved;
  }
}

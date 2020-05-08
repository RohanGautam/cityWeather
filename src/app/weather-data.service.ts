import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from './weatherResponse';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private APIkey: string = "8cc6aaa67b474fd136057f0d738cbad3"
  private dataRecieved;
  weatherData: WeatherResponse;
  db;

  private imageMap = {
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

  constructor(private http: HttpClient, private onlineOfflineService: OnlineOfflineService) {
    this.registerToEvents(onlineOfflineService);
    this.createOfflineDb()
  }

  private callAPI(cityName: string) {
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.APIkey}`
    return this.http.get(url);
  }

  async getData(cityName: string, requestorId: number): Promise<WeatherResponse> {
    try {
      if (this.onlineOfflineService.isOnline) {
        this.dataRecieved = await this.callAPI(cityName).toPromise();
        this.weatherData = {
          cityName: this.dataRecieved['name'],
          main: this.dataRecieved['weather'][0]['main'],
          description: this.dataRecieved['weather'][0]['description'],
          imageUrl: this.imageMap[this.dataRecieved['weather'][0]['main']],
          tempMax: (this.dataRecieved['main']['temp_max'] - 273.15).toFixed(2),
          tempMin: (this.dataRecieved['main']['temp_min'] - 273.15).toFixed(2),
          code: this.dataRecieved['cod'],
          requestorId: requestorId
        }
        this.addToIndexedDb(this.weatherData);
        return this.weatherData;
      } else {
        // if offline, get the stored data from indexedDb and return that

      }

    } catch (error) {
      this.weatherData = {
        cityName: null,
        main: null,
        description: null,
        imageUrl: null,
        tempMax: null,
        tempMin: null,
        code: error.status,
        requestorId:requestorId
      }
      return this.weatherData;
    }
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log("Back online");
      } else {
        console.log('Went offline. storing values in indexdb');
      }
    });
  }
  private createOfflineDb() {
    this.db = new Dexie('MyTestDatabase'); // create database with indexDb
    this.db.delete()
    this.db = new Dexie('MyTestDatabase'); // create database with indexDb
    this.db.version(1).stores({
      weatherData: 'requestorId,cityName,main,description,imgUrl,tempMax,tempMin,code'
    });
  }

  private addToIndexedDb(data: WeatherResponse) {
    console.log(`Adding data from component ${data.requestorId} to db..`)
    this.db.weatherData
      .put(data) // adds new or replaces existing one
      .then(async () => {
        const allItems: WeatherResponse[] = await this.db.weatherData.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch(async(err) => {
        console.log(err);
        console.log('Value already in database');
        const allItems: WeatherResponse[] = await this.db.weatherData.toArray();
        console.log('DB is', allItems);

      })
  }

  private async getOfflineData(requestorId:number){}

  private async sendItemsFromIndexedDb() {
    const allItems: WeatherResponse[] = await this.db.weatherData.toArray();

    allItems.forEach((item: WeatherResponse) => {
      // send items to backend...
      this.db.todos.delete(item.cityName).then(() => {
        console.log(`item ${item.cityName} sent and deleted locally`);
      });
    });
  }
}

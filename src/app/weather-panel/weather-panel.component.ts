import { Component, OnInit, Input } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { WeatherResponse } from '../weatherResponse';
import { OnlineOfflineService } from '../online-offline.service';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.scss']
})
export class WeatherPanelComponent implements OnInit {
  @Input() componentId: number;

  weatherData: WeatherResponse;
  dataRefresher :Subscription;
  refreshFrequency=10000;// 10 seconds for now

  // some booleans we manipulate for *ngIf's to conditionally render content
  wantToSearch: boolean = false;
  fromCard: boolean = false;
  searching: boolean = false;
  errorInInput: boolean = false;
  showOfflineMessage: boolean;
  validResponse: boolean = false;
  // stores text typed in search box
  cityInput: string;
  // image path for picure shown on unclicked card
  placeholderPath = "assets/images/placeholder.png"
  //card background image url
  imageUrl: string | null = null;

  db;

  constructor(public wdObj: WeatherDataService, public onlineOfflineService: OnlineOfflineService) { 
    this.registerToEvents(onlineOfflineService);
  }
  
  async ngOnInit() {
    this.showOfflineMessage = !this.onlineOfflineService.isOnline;
    this.getDataIfStoredOffline();
  }

  private async getDataIfStoredOffline() {
    // check for stored values even on refreshing when online
    const storedData: WeatherResponse = await this.wdObj.getOfflineData(this.componentId)
    if (storedData != null) {
      this.validResponse = true;
      this.fromCard = true
      this.wantToSearch = false;
      this.errorInInput = false;

      this.weatherData = storedData;
      this.imageUrl = this.weatherData.imageUrl;
      // begin making refresh calls if online
      if (!this.showOfflineMessage){
        this.beginCalling(this.weatherData.cityName);
      }
    }
    
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        this.showOfflineMessage=false;
      } else {
        this.showOfflineMessage=true;
      }
    });
  }

  async getData(cityName: string) {
    if (!this.showOfflineMessage) {
      this.weatherData = await this.wdObj.getData(cityName, this.componentId);
      let statusCode: number = this.weatherData.code;
      if (statusCode == 200) {
        this.validResponse = true;
        this.wantToSearch = false;
        this.errorInInput = false;
  
        // console.log(`Parsed API response -> ${this.weatherData}`);
        this.imageUrl = this.weatherData.imageUrl;
      } else {
        this.errorInInput = true;
      }
    }

  }

  async beginCalling (cityName: string){
    // get the data initially before beginning subscription
    await this.getData(cityName);
    // unsubscribe if a subscription/reference already exists
    if (this.dataRefresher!=null){
      this.dataRefresher.unsubscribe();
    }
    // begin a new  subscription
    this.dataRefresher = interval(this.refreshFrequency).subscribe(x => {
      console.log(`Getting data again in component ${this.componentId}`);       
      this.getData(cityName);
    })

  }

  async search() {
    this.validResponse = false;
    this.searching = true;
    await this.beginCalling(this.cityInput);
    this.searching = false;
  }

  showSearchBar() {
    if (!this.showOfflineMessage){
      this.wantToSearch = true;
      this.fromCard = true;
    }
  }

  edit() {
    this.wantToSearch = !this.wantToSearch;
    this.validResponse = !this.validResponse;
  }


}

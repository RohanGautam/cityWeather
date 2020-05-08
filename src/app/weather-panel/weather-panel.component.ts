import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { WeatherResponse } from '../weatherResponse';
import { OnlineOfflineService } from '../online-offline.service';
import Dexie from 'dexie';

@Component({
  selector: 'app-weather-panel',
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.scss']
})
export class WeatherPanelComponent implements OnInit {

  weatherData:WeatherResponse;
  
  // some booleans we manipulate for *ngIf's to conditionally render content
  wantToSearch:boolean=false;
  fromCard:boolean=false;
  searching:boolean=false;
  errorInInput:boolean=false;
  validResponse:boolean=false;
  // stores text typed in search box
  cityInput:string; 
  // image path for picure shown on unclicked card
  placeholderPath="assets/images/placeholder.png"
  //card background image url
  imageUrl:string|null=null;

  db;

  constructor(public wdObj:WeatherDataService) {}

  ngOnInit(): void {
    // this.getData();
  }

  async getData(cityName:string){
    
    this.weatherData = await this.wdObj.getData(cityName)    
    let statusCode:number = this.weatherData.code;
    if(statusCode==200){
      this.validResponse=true;      
      this.wantToSearch=false; 
      this.errorInInput=false;

      console.log(this.weatherData);
      this.imageUrl=this.weatherData.imageUrl;
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

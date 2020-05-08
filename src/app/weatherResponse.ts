export interface WeatherResponse{
    cityName:string|null;
    main:string|null;
    description:string|null;
    imageUrl:string|null;
    tempMax:string|null;
    tempMin:string|null;
    code:number;
    requestorId:number;
}
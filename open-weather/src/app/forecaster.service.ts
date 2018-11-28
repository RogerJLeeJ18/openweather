import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ForecastData } from './forecastdata';
// import hello from '../assets/forecast.json';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ForecasterService {
  forecastData: any;
  uri = 'http://localhost:4000';
  name: string = "hellloooooooooo"
  constructor(public http: HttpClient) {
  }

  // getForecast(city): Observable<ForecastData[]> {
  //   console.log(city, "in service")
  //   return 
  // }
  // public fetchForecast() {
  //   return this.http.get(`${this.uri}/forecast/`).pipe(map((res: Response) => res.json()))
  // }
  public fetchForecast() {
    return this.http.get<ForecastData[]>(`${this.uri}/forecast/`);
  }
  // getForecast() {
  //   let observable = new Observable<{ day: number, conditions: string, high: number, low: number, precip: string, wind: string, humidity: string, }>(observer => {
  //     this.http.get(`${this.uri}/forecast/`)
  //       .subscribe((data) => {
  //       observer.next(data);
  //     });
  //   });
  //   return observable;
  // }

  // getForecast(city): Observable<ForecastData[]> {
  //   return this.http.get<ForecastData[]>(this.uri)
  //     .pipe(
  //       tap(_ => this.log('fetched heroes')),
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }

  // getForecast(city) {
  //   console.log("hellooo")
  //    this.http.get(`${this.uri}/forecast/${city}`)
  //     // .subscribe((data) => {
  //     //   this.forecastData = data;
  //     //   console.log('Data requested ... ');
  //     //   console.log(data, "data");
  //     //   console.log(this.forecastData, "forecast data in service");
  //     // });
  // }
  
}

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { ForecastData } from './forecastdata';
// import hello from '../assets/forecast.json';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ForecasterService {
  private forecastURL: string = `http://localhost:4000/forecast/`;
  private forecastSource = new BehaviorSubject<string>(null)
  forecast$ = this.forecastSource.asObservable();
  
  changeSource(query: string){
    this.forecastSource.next(query)
    console.log(this.forecast$)
    console.log(this.forecastSource)
  }

  constructor(private http: Http) {
  }
  
  search(query: any): Observable<any>{
    const search: URLSearchParams = new URLSearchParams();
    search.set('q', query)
    console.log({search}, "in searchcchch")
    return this.http
    .get(this.forecastURL, {search})
    .pipe(map(data => data.json()))
  }
}

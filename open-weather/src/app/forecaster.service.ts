import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecasterService {
  private forecastURL: string = `http://localhost:4000/forecast/`;
  private forecastSource = new BehaviorSubject<string>(null)
  forecast$ = this.forecastSource.asObservable();
  
  changeCity(city: string){
    this.forecastSource.next(city)
  }

  constructor(private http: Http) {
  }
  
  httpGetForecast(city: any): Observable<any>{
    const search: URLSearchParams = new URLSearchParams();
    search.set('q', city)
    return this.http
    .get(this.forecastURL, {search})
    .pipe(map(data => data.json()))
  }
}

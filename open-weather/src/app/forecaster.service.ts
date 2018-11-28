import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForecasterService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) {
  }
  getForecast(city) {
    console.log("hellooo")
    return this.http.get(`${this.uri}/forecast`);
  }
  
}

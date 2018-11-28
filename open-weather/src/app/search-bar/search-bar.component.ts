import { Component, OnInit } from '@angular/core';
import { ForecasterService } from '../forecaster.service';
import { Observable, Subject } from 'rxjs';
import { ForecastData } from '../forecastdata';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  // forecast$: Observable<ForecastData[]>;
  // private searchTerms = new Subject<string>();
  // items$: Observable<Item[]>
  searchCity: string = 'New Orleans';
  constructor(private forecasterService: ForecasterService, private http: HttpClient) { }
 
  // search(city: string): void {
  //   this.searchTerms.next(city);
  // }

  ngOnInit() {
    // this.forecast$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((city: string) => this.forecasterService.getForecast(this.searchCity)),
    // );
    
  }
  // getItems(): Observable<Item[]> {
  //   return this.http.get<Item[]>(this.itemUrl);
  // }
  // getForecast(city: string = this.searchCity) {
  //   this.forecasterService
  //     .getForecast(city)
  //     // .subscribe((data) => {
  //     //   console.log('Data requested ... ');
  //     //   console.log(data);
  //     // });
  // }

}

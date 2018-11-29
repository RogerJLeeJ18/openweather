import { Component, OnInit, Input } from '@angular/core';
import { ForecasterService } from '../forecaster.service';
import { ForecastData } from '../forecastdata';
import { Observable } from "rxjs"
import { DATA } from "../mock-data"

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  // fiveDayForecast: Array<{ number: number, city: string, lowTemp: number }> = [];
  // testTitle: object;
  public forecasts = [];
  // public users$: Observable<DATA[]>



  constructor(private forecasterService: ForecasterService) {
    // this.testTitle = forecasterService.forecastData;
    // this.forecasterService.fetchForecast("New Orleans")
    //   .subscribe(data => {
    //     console.log(data)
    //     this.forecasts = data

    //   })
    // console.log(forecasterService.forecastData)
  };

  ngOnInit() {
    // this.getForecast();
    // this.forecasterService.fetchForecast("New Orleans")
    //   .subscribe(data => {
    //     console.log(data)
    //     this.forecasts = data
        
    //   })
  }
  // getForecast(): void {
  //   this.forecasterService.getForecast()
  //     .subscribe(forecastData => this.forecast = JSON.parse(forecastData));
  // }

}

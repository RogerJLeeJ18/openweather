import { Component, OnInit, Input } from '@angular/core';
import { ForecasterService } from '../forecaster.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  
  forecasts: any;
  error: string;
  subscription: Subscription;
  city: string;

  constructor(private forecasterService: ForecasterService) {};

  ngOnInit() {
    this.getCity();
  }
  
  getCity(){
    this.subscription = this.forecasterService.forecast$
    .subscribe(
      city => {
        if (city === null){
          this.city = 'New Orleans'
        } else {
          this.city = city
        }
        this.getForecast();
      },
      err => this.error = err
    )
  }

  getForecast(){
    if(this.city){
      this.forecasterService
      .httpGetForecast(this.city)
      .subscribe(forecasts => {
        this.forecasts = forecasts;
      }),
      err => {
        console.log(err);
        this.error=<any>err;
      } 
    }
  }
}


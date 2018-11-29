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
  item: string;

  constructor(private forecasterService: ForecasterService) {};

  getQuery(){
    this.subscription = this.forecasterService.forecast$
    .subscribe(
      item => {
        if (item === null){
          this.item = 'New Orleans'
        } else {
          this.item = item
        }
        this.searchFromForecast();
      },
      err => this.error = err
    )
  }

  ngOnInit() {
    this.getQuery();
  }

  searchFromForecast(){
    console.log(this.item)
    if(this.item){
      this.forecasterService
      .search(this.item)
      .subscribe(forecasts => {
        console.log(forecasts, "forecastsssss");
        this.forecasts = forecasts;
      }),
      err => {
        console.log(err);
        this.error=<any>err;
      } 
    }
  }
 

}

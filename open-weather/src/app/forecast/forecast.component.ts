import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  fiveDayForecast: Array<{ number: number, city: string, lowTemp: number }> = [];
  testTitle: string = 'Forecast Component'
  constructor() { }

  ngOnInit() {
  }

}

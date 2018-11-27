import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  lowTemp: number = 34;
  highTemp: number = 99;
  currentTemp: number;  
  windSpeed: number;
  windDirection: number;

  constructor() { }

  ngOnInit() {
  }

}

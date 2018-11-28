import { Component, OnInit } from '@angular/core';
import { ForecasterService } from '../forecaster.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchCity: string = 'Austin';
  forecast: Array<{ number: number, city: string, lowTemp: number }> = [];
  constructor(private forecasterService: ForecasterService) { }

  ngOnInit() {
    this.getForecast();
  }
  getForecast() {
    this.forecasterService
      .getForecast(this.searchCity)
      .subscribe((data) => {
        
        console.log('Data requested ... ');
        console.log(data);
      });
  }

}

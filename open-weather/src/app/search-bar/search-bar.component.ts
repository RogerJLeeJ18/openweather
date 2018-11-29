import { Component, OnInit } from '@angular/core';
import { ForecasterService } from '../forecaster.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  
  city: string

  constructor(private forecasterService: ForecasterService) { }
 
  search() {
    this.forecasterService.changeCity(this.city);
    this.city = "";
  }

  ngOnInit() {  
  }
}

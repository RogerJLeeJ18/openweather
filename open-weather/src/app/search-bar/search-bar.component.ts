import { Component, OnInit } from '@angular/core';
import { ForecasterService } from '../forecaster.service';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  query: string = 'New Orleans';
  constructor(private forecasterService: ForecasterService) { }
 
  search() {
    console.log(this.query)
    this.forecasterService.changeSource(this.query);
    this.query = "";
  }

  ngOnInit() {

    
  }


}

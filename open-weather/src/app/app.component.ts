import { Component } from '@angular/core';
import { ForecasterService } from './forecaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private forecasterService: ForecasterService) { } 
}

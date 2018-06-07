import { Component } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'JUI Web App';

  config;

  constructor(private configService: ConfigService) {
    this.config = configService.config;
  }
}

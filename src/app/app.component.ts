import { Component, OnInit } from '@angular/core';
import { BiometricService } from './biometric.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Biometric-Integration';

  device: any

  constructor(private service: BiometricService) { }
  ngOnInit(): void {


  }


  deviceChange(event) {
    this.device = event.target.value

  }





}

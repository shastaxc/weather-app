import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isMobileDevice: boolean;

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobileDevice = this.deviceService.isMobile();
  }
}

import { Component, OnInit } from '@angular/core';
import { SNGAlertType, SNGAlertService } from 'projects/simpleng/src/public_api';

@Component({
  selector: 'app-alert-demo',
  templateUrl: './alert-demo.component.html'
})
export class AlertDemoComponent implements OnInit {

  constructor(private alertService: SNGAlertService) { }

  ngOnInit() {
  }

  showMessage(type: SNGAlertType) {
    this.alertService[type](`Hello! This is a (${type})`);
  }

  clear() {
    this.alertService.clear();
  }

}

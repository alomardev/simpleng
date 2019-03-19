import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SNGTablePage, SNGTableComponent } from 'projects/simpleng/src/public_api';
import { DummyService } from './dummy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(SNGTableComponent) table: SNGTableComponent<any>;

  constructor(private dummyService: DummyService) {}

  ngAfterViewInit() {
    this.loadData(this.table.page); // Default emission
  }

  loadData(page: SNGTablePage) {
    this.dummyService.getPagedDummyData(
      page.pageNumber,
      page.pageSize,
      page.sortProp,
      page.sortDirection
    ).subscribe(data => {
      this.table.updateByPageResponse(data);
    });
  }

}

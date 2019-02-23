import { Component } from '@angular/core';
import { SNGTablePage, SNGTableData } from 'projects/simpleng/src/public_api';
import { DummyService } from './dummy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tableData: SNGTableData<any> = new SNGTableData();

  constructor(private dummyService: DummyService) {}

  loadData(page?: SNGTablePage) {
    this.dummyService.getPagedDummyData(
      page.pageNumber,
      page.pageSize,
      page.sortProp,
      page.sortDirection
    ).subscribe(data => {
      this.tableData.updateFromJpaPage(data);
    });
  }

}

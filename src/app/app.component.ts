import { Component, Inject } from '@angular/core';
import { SNGPaginationConfig, SNGTablePage } from 'projects/simpleng/src/lib/simpleng';
import { SNGTableData, SNG_DEFAULT_PAGINATION_CONFIG } from 'projects/simpleng/src/public_api';
import { DummyService } from './dummy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tableData: SNGTableData<any> = new SNGTableData();

  constructor(private dummyService: DummyService,
              @Inject(SNG_DEFAULT_PAGINATION_CONFIG)
              private paginationConfig: SNGPaginationConfig) {
    this.loadData();
  }

  loadData(page?: SNGTablePage) {
    this.dummyService.getPagedDummy(
      !page ? 1 : page.pageNumber,
      !page ? this.paginationConfig.defaultPageSize : page.pageSize,
      !page ? null : page.sortProp,
      !page ? null : page.sortDirection
    ).subscribe(data => {
      this.tableData.updateFromJpaPage(data);
    });
  }

}

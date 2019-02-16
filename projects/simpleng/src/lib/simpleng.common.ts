import { SNGConfigs } from './simpleng';

export const SNGDefaultConfigs: SNGConfigs = {
  table: {
    responsive: true,
    style: {
      tableStyle: 'default',
      tableTheme: 'default',
      headerTheme: 'default',
      small: false,
      striped: false,
      hover: false,
    },
  },
  pagination: {
    pageSizes: [10, 50, 100, 200],
    visiblePages: 5,
    defaultPageSize: 50
  }
};

export class SNGTableData<T> {

  data: T[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;

  updateFromJpaPage(data: any) {
    this.update(data.content, data.number, data.size, data.totalElements);
  }

  update(data: T[], pageNumber?: number, pageSize?: number, totalRecords?: number) {
    this.data = data;
    this.pageNumber = pageNumber || this.pageNumber;
    this.pageSize = pageSize || this.pageSize;
    this.totalRecords = totalRecords || this.totalRecords;
  }

}

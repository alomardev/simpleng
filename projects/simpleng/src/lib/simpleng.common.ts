export interface SNGConfigs {
  table?: SNGTableConfig;
  pagination?: SNGPaginationConfig;
}

export interface SNGTableConfig {
  responsive?: boolean;
  style?: {
    tableStyle?: 'default' | 'bordered' | 'borderless',
    tableTheme?: 'default' | 'dark' | 'light',
    headerTheme?: 'default' | 'dark' | 'light',
    small?: boolean,
    striped?: boolean,
    hover?: boolean,
  };
}

export interface SNGPaginationConfig {
  pageSizes?: number[];
  visiblePages?: number;
  defaultPageSize?: number;
}

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

export interface SNGTablePage {
  pageNumber?: number;
  pageSize?: number;
  sortProp?: string;
  sortDirection?: 'ASC' | 'DESC';
}

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

export interface SNGConfigs {
  table?: SNGTableConfig;
  pagination?: SNGPaginationConfig;
  alert?: SNGAlertConfig;
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
  zeroBased?: boolean;
  pageSizes?: number[];
  visiblePages?: number;
  defaultPageSize?: number;
}

export interface SNGAlertConfig {
  dismissable?: boolean;
  animation?: boolean;
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
    zeroBased: true,
    pageSizes: [10, 50, 100, 200],
    visiblePages: 5,
    defaultPageSize: 50
  },
  alert: {
    dismissable: true,
    animation: true,
  }
};

export interface SNGTablePage {
  pageNumber?: number;
  pageSize?: number;
  sortProp?: string;
  sortDirection?: 'ASC' | 'DESC';
}

export interface PageResult<T> {
  number: number;
  size: number;
  content: T[];
  totalElements: number;
}

export class SNGTableData<T> {

  data: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;

  updateFromPage(page: PageResult<T>) {
    this.update(page.content, page.number, page.size, page.totalElements);
  }

  update(data: T[], pageNumber?: number, pageSize?: number, totalElements?: number) {
    this.data = data;
    this.pageNumber = pageNumber || this.pageNumber;
    this.pageSize = pageSize || this.pageSize;
    this.totalElements = totalElements || this.totalElements;
  }

}

// Alert

export type SNGAlertType = 'success' | 'warning' | 'error' | 'info';

export type SNGAlertMessage = string | {key: string, [key: string]: string};

export interface SNGAlertValue {
  message: SNGAlertMessage;
  type: SNGAlertType;
  context?: string;
  timeout?: number;
}

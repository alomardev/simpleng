export interface SNGConfigs {
  table?: SNGTableConfig,
  pagination?: SNGPaginationConfig,
}

export interface SNGTableConfig {
  responsive?: boolean,
  style?: {
    tableStyle?: 'default' | 'bordered' | 'borderless',
    tableTheme?: 'default' | 'dark' | 'light',
    headerTheme?: 'default' | 'dark' | 'light',
    small?: boolean,
    striped?: boolean,
    hover?: boolean,
  },
}

export interface SNGPaginationConfig {
  pageSizes?: number[];
  visiblePages?: number;
  defaultPageSize?: number;
}

/* END OF CONFIGURATIONS */

export interface SNGTablePage {
  pageNumber?: number;
  pageSize?: number;
  sortProp?: string;
  sortDirection?: 'ASC' | 'DESC';
}
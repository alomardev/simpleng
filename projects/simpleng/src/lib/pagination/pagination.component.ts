import { Component, OnInit, Input, InjectionToken, Inject, Optional, Output, EventEmitter } from '@angular/core';
import { SNGPaginationConfig, SNGTablePage, SNGDefaultConfigs } from '../simpleng.common';

export const SNG_DEFAULT_PAGINATION_CONFIG = new InjectionToken<SNGPaginationConfig>('Default SimpleNG Pagination configuration');

@Component({
  selector: 'sng-pagination',
  templateUrl: './pagination.component.html',
})
export class SNGPaginationComponent implements OnInit {

  @Output() pageChange: EventEmitter<SNGTablePage> = new EventEmitter();

  private _config: SNGPaginationConfig;
  @Input('config')
  set config(val: SNGPaginationConfig) {
    this._config = {
      ...SNGDefaultConfigs.pagination,
      ...this.injectedConfig,
      ...val
    };
  }
  get config() {
    return this._config;
  }

  startRow: number;
  endRow: number;
  totalPages: number;
  pages: number[] = [];

  _oneBasedPageNumber: number;
  private _totalRecords: number;
  private _pageNumber: number;
  private _pageSize: number;

  @Input('totalRecords')
  set totalRecords(value: number) {
    this._totalRecords = value;
    this.calculate();
  }

  get totalRecords() {
    return this._totalRecords;
  }

  @Input('pageSize')
  set pageSize(value: number) {
    this._pageSize = value;
    this.calculate();
    this.fixPageNumber();
  }

  get pageSize() {
    return this._pageSize;
  }

  @Input('pageNumber')
  set pageNumber(value: number) {
    this._pageNumber = value;
    this._oneBasedPageNumber = this.config.zeroBased ? value + 1 : value;
    this.calculate();
  }

  get pageNumber() {
    return this._pageNumber;
  }

  get page() {
    return {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };
  }

  constructor(@Optional() @Inject(SNG_DEFAULT_PAGINATION_CONFIG) private injectedConfig: SNGPaginationConfig) {
    this.config = injectedConfig;
  }

  ngOnInit() {
    this.pageNumber = this.config.zeroBased ? 0 : 1;
    this.pageSize = this.config.defaultPageSize;
  }

  emitChanges() {
    this.pageChange.emit({...this.page});
  }

  setCurrentPage(pageNumber: number, pageSize: number) {
    this.setCurrentPageNumber(pageNumber, false);
    this.setCurrentPageSize(pageSize, false);
    this.emitChanges();
  }

  setCurrentPageNumber(pageNumber: number, emit: boolean = true) {
    let oneBased = this.config.zeroBased ? pageNumber + 1 : pageNumber;
    if (oneBased > this.totalPages) {
      oneBased = this.totalPages;
    }
    if (oneBased < 1) {
      oneBased = 1;
    }
    this.pageNumber = this.config.zeroBased ? oneBased - 1 : oneBased;
    if (emit) {
      this.emitChanges();
    }
  }

  setCurrentPageSize(pageSize: number, emit: boolean = true) {
    if (pageSize < 1) {
      pageSize = 1;
    }
    this.pageSize = pageSize;
    this.fixPageNumber();
    if (emit) {
      this.emitChanges();
    }
  }

  firstPage() {
    this.setCurrentPageNumber(this.config.zeroBased ? 0 : 1);
  }

  lastPage() {
    this.setCurrentPageNumber(this.config.zeroBased ? this.totalPages - 1 : this.totalPages);
  }

  nextPage() {
    this.setCurrentPageNumber(this.pageNumber + 1);
  }

  prevPage() {
    this.setCurrentPageNumber(this.pageNumber - 1);
  }

  private calculate() {
    if (!this.config) { return; }

    this.startRow = this.pageSize * (this._oneBasedPageNumber - 1) + 1;
    this.endRow = this.pageSize * this._oneBasedPageNumber;
    if (this.endRow > this.totalRecords) { this.endRow = this.totalRecords; }
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

    this.pages = [];

    let start = this._oneBasedPageNumber - Math.floor(this.config.visiblePages / 2);
    if (start + this.config.visiblePages - 1 > this.totalPages) {
      start = this.totalPages - this.config.visiblePages + 1;
    }
    if (start < 1) { start = 1; }

    for (let i = 0; i < this.config.visiblePages && i < this.totalPages; i++) {
      this.pages.push(start + i);
    }
  }

  private fixPageNumber() {
    this.setCurrentPageNumber(this.pageNumber, false);
  }

}

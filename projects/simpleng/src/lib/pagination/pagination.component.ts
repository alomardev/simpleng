import { Component, OnInit, Input, InjectionToken, Inject, Optional, Output, EventEmitter } from '@angular/core';
import { SNGPaginationConfig, SNGTablePage } from '../simpleng';
import { SNGDefaultConfigs } from '../simpleng.common';

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
    this.calculate();
  }

  get pageNumber() {
    return this._pageNumber;
  }

  constructor(@Optional() @Inject(SNG_DEFAULT_PAGINATION_CONFIG) private injectedConfig: SNGPaginationConfig) {
    this.config = injectedConfig;
  }

  ngOnInit() {
    this.pageNumber = 1;
    this.pageSize = this.config.defaultPageSize;
  }

  emitChanges() {
    this.pageChange.emit({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  setCurrentPage(pageNumber: number, pageSize: number) {
    this.setCurrentPageNumber(pageNumber, false);
    this.setCurrentPageSize(pageSize, false);
    this.emitChanges();
  }

  setCurrentPageNumber(pageNumber: number, emit: boolean = true) {
    if (pageNumber > this.totalPages) {
      pageNumber = this.totalPages;
    }
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    this.pageNumber = pageNumber;
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

  nextPage() {
    this.setCurrentPageNumber(this.pageNumber + 1);
  }

  prevPage() {
    this.setCurrentPageNumber(this.pageNumber - 1);
  }

  private calculate() {
    if (!this.config) { return; }

    this.startRow = this.pageSize * (this.pageNumber - 1) + 1;
    this.endRow = this.pageSize * this.pageNumber;
    if (this.endRow > this.totalRecords) { this.endRow = this.totalRecords; }
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

    this.pages = [];

    let start = this.pageNumber - Math.floor(this.config.visiblePages / 2);
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

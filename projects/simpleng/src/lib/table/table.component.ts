import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  Optional,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { SNGPaginationComponent } from '../pagination/pagination.component';
import { SNGPaginationConfig, SNGTableConfig, SNGTablePage, SNGDefaultConfigs, SNGTableData } from '../simpleng.common';
import { SNGTableColumnComponent } from './column/table-column.component';
import { SNGTableHeaderOutletDirective } from './table-header-outlet.directive';

export const SNG_DEFAULT_TABLE_CONFIG = new InjectionToken<SNGTableConfig>('Default SimpleNG Table configuration');

@Component({
  selector: 'sng-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SNGTableComponent implements AfterViewInit {

  private readonly cssClass = {
    sort: 'sng-table-sort',
    sortSpacing: 'sng-table-sort-spacing',
    sortAsc: 'sng-table-sort-asc',
    sortDesc: 'sng-table-sort-desc',
  };

  @HostBinding('class.sng-table') sngTableClass = true;

  _config: SNGTableConfig;
  @Input('config')
  set config(val: SNGTableConfig) {
    this._config = {
      ...SNGDefaultConfigs.table,
      ...this.injectedConfig,
      ...val
    };
  }
  get config() {
    return this._config;
  }
  @Input() tableData: SNGTableData<any> = new SNGTableData();
  @Input() hidePagination = false;
  @Input() pagination: SNGPaginationConfig;

  @Output() pageChange: EventEmitter<SNGTablePage> = new EventEmitter();

  @ViewChild(SNGTableHeaderOutletDirective) headerOutlet: SNGTableHeaderOutletDirective;
  @ViewChild(SNGPaginationComponent) paginationComponent: SNGPaginationComponent;

  @ViewChild('emptyHeaderTemplate') emptyHeaderTemplate: TemplateRef<any>;
  @ContentChildren(SNGTableColumnComponent) columnsList: QueryList<SNGTableColumnComponent>;


  get tableStyle() {
    return {
      'table-bordered': this.config.style.tableStyle === 'bordered',
      'table-borderless': this.config.style.tableStyle === 'borderless',
      'table-dark': this.config.style.tableTheme === 'dark',
      'table-light': this.config.style.tableTheme === 'light',
      'table-striped': this.config.style.striped,
      'table-hover': this.config.style.hover,
      'table-sm': this.config.style.small,
    };
  }
  get headerStyle() {
    return {
      'thead-dark': this.config.style.headerTheme === 'dark',
      'thead-light': this.config.style.headerTheme === 'light',
    };
  }

  page: SNGTablePage = {
    pageNumber: 0,
    pageSize: 0
  };

  private currentSortElement: any;

  constructor(private renderer: Renderer2, @Optional() @Inject(SNG_DEFAULT_TABLE_CONFIG) private injectedConfig: SNGTableConfig) {
    this.config = injectedConfig;
  }

  ngAfterViewInit() {
    this.renderHeaders();
    this.columnsList.changes.subscribe((list: QueryList<SNGTableColumnComponent>) => {
      this.renderHeaders(list);
    });
    this.emitChanges(); // Default emission.
  }

  paginationChange() {
    this.emitChanges();
  }

  sort(sort: string, element: any) {
    if (this.page.sortProp !== sort) {
      this.page.sortProp = sort;
      this.page.sortDirection = 'DESC';
      if (this.currentSortElement) {
        this.renderer.removeClass(this.currentSortElement, this.cssClass.sortAsc);
        this.renderer.removeClass(this.currentSortElement, this.cssClass.sortDesc);
      }
    } else {
      switch (this.page.sortDirection) {
        case 'DESC':
          this.page.sortDirection = 'ASC';
          break;
        case 'ASC':
          this.page.sortProp = null;
          this.page.sortDirection = null;
          break;
      }
    }
    if (this.page.sortDirection === 'ASC') {
      this.renderer.removeClass(element, this.cssClass.sortDesc);
      this.renderer.addClass(element, this.cssClass.sortAsc);
    }
    if (this.page.sortDirection === 'DESC') {
      this.renderer.removeClass(element, this.cssClass.sortAsc);
      this.renderer.addClass(element, this.cssClass.sortDesc);
    }
    if (!this.page.sortDirection) {
      this.renderer.removeClass(element, this.cssClass.sortAsc);
      this.renderer.removeClass(element, this.cssClass.sortDesc);
    }
    this.currentSortElement = element;
    this.emitChanges();
  }

  private emitChanges() {
    this.pageChange.emit({...this.page, ...this.paginationComponent.page});
  }

  private renderHeaders(list: QueryList<SNGTableColumnComponent> = this.columnsList) {
    const vc = this.headerOutlet.viewContainer;
    vc.clear();
    list.forEach((c: SNGTableColumnComponent) => {
      if (c.headerTemplate) {
        const view = vc.createEmbeddedView(c.headerTemplate);
        if (view.rootNodes.length === 0 || view.rootNodes[0].tagName !== 'TH') {
          console.error('sngTableHeader template should be applied to <th></th>\n' +
                        'example: <th *sngTableHeader><!-- Header Content --></th>');
          this.renderEmptyHeader();
          return;
        }

        if (c.sort) {
          const th =  view.rootNodes[0] as HTMLElement;
          const spacingSpan = document.createElement('span');
          this.renderer.addClass(spacingSpan, this.cssClass.sortSpacing);

          if (th.childNodes.length > 0) {
            const nodes = [];
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < th.childNodes.length; i++) {
              nodes.push(th.childNodes[i]);
            }
            th.innerHTML = '';
            nodes.forEach(n => { this.renderer.appendChild(spacingSpan, n); });
          }
          this.renderer.appendChild(th, spacingSpan);
          this.renderer.addClass(th, this.cssClass.sort);
          this.renderer.listen(th, 'click', () => {
            this.sort(c.sort, th);
          });
        }
      } else {
        this.renderEmptyHeader();
      }
    });
  }

  private renderEmptyHeader() {
    this.headerOutlet.viewContainer.createEmbeddedView(this.emptyHeaderTemplate);
  }

}

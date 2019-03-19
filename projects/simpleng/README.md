# SimpleNG Library

[![npm version](https://badge.fury.io/js/simpleng.svg)](https://www.npmjs.com/package/simpleng)

SimpleNG is Angular library that contains simple and easy-to-use components. Bootstrap css classes are used in the UI; however, the customization is possible by using component-specific css classes.

### Available Components

- Table
- Alert

### Dependencies

Angular 5+

### Install

```
npm install simpleng --save
```

### Setup

```typescript
import { SimpleNGModule } from 'simpleng';

@NgModule({
  ...
  imports: [
    ...
    SimpleNGModule,
  ],
})
export class AppModule {}
```

Global configurations can be provided by importing `SimpleNGModule.configure({...})`

```typescript
import { SimpleNGModule } from 'simpleng';

@NgModule({
  ...
  imports: [
    ...
    SimpleNGModule.configure({
      table: {...},
      pagination: {...},
      alert: {...}
    }),
  ],
})
export class AppModule {}
```



## Table

SNGTable is a component that renders html table, with sorting and pagination user interface. Data should be passed manually instead of slicing and sorting them internally.

### Usage

```html
<sng-table (pageChange)="loadData($event)">
  <sng-table-column>
    <th *sngTableHeader>ID</th>
    <td *sngTableRow="let row">{{ row.id }}</td>
  </sng-table-column>
  <sng-table-column sort="title">
    <th *sngTableHeader>Title</th>
    <td *sngTableRow="let row">{{ row.title }}</td>
  </sng-table-column>
  <sng-table-column sort="body">
    <th *sngTableHeader>Body</th>
    <td *sngTableRow="let row">{{ row.body }}</td>
  </sng-table-column>
</sng-table>
```

```typescript
@ViewChild(SNGTableComponent) table: SNGTableComponent<any>;
...
loadData(page: SNGTablePage) {
  this.dummyService.getPagedDummyData(
    page.pageNumber,
    page.pageSize,
    page.sortProp,
    page.sortDirection
  ).subscribe(pageResponse => {
    this.table.updateByPageResponse(pageResponse);
  });
}
```

SNGTableComponent instance should be updated after fetching new data. If the response comes as `PageResponse` object. Table properties can be updated by calling `SNGTableComponent.update(data: T[], pageNumber?: number, pageSize?: number, totalRecords?: number)`. If the response comes as `PageResponse` object, a shorthand method can be used instead `SNGTableComponent.updateByPageResponse(page)`.

`SNGTableComponent.page` contains current page properties. Note that Initial table page object is available in the lifecycle hook `ngAfterViewInit()`. 

[More]: https://angular.io/guide/lifecycle-hooks



```typescript
import { AfterViewInit } from '@angular/core';
...
export class AppComponent implements AfterViewInit {
    @ViewChild(SNGTableComponent) table: SNGTableComponent<any>;
	...
    ngAfterViewInit() {
        this.loadData(this.table.page); // Initial load
    }
}
```

### Pagination

Table components will render the pagination by default. It can be disabled by setting `pagination="none"` attribute to the component.

```html
<sng-table pagination="none">
  ...
</sng-table>
```

### Configurations

SNGTable component can be configured individually by passing `[config]` for table configuration, and `[paginationConfig]` for pagination configuration.

```html
<sng-table [config]="{...}" [paginationConfig]="{...}">
  ...
</sng-table>
```

#### Table Options

| Option            | Type    | Default | Description                                                  |
| ----------------- | ------- | ------- | ------------------------------------------------------------ |
| responsive        | boolean | true    | Make the table responsive by adding `responsive` bootstrap class to the component |
| style             | object  | ↓       | Object containing several options to style the table         |
| style.tableStyle  | string  | default | Table style which accepts one of the following values: `default`, `bordered`, `borderless` |
| style.tableTheme  | string  | default | Table background color which accepts the following values: `default`, `dark`, `light` |
| style.headerTheme | string  | default | Table header background color which accepts the following values: `default`, `dark`, `light` |
| style.small       | boolean | false   | `true` makes the table compact                               |
| style.striped     | boolean | false   | Striped table rows                                           |
| style.hover       | boolean | false   | Highlight a row when hovering                                |

#### Pagination Options

| Option          | Type     | Default            | Description                                                  |
| :-------------- | -------- | ------------------ | ------------------------------------------------------------ |
| zeroBased       | boolean  | true               | Page data will start from zero                               |
| pageSizes       | string[] | [10, 50, 100, 200] | Page size options to allow users picking one of them         |
| visiblePages    | number   | 5                  | Maximum number of pagination buttons that appears to the user |
| defaultPageSize | number   | 50                 | Default page size                                            |



## Alert

SNGAlert makes it easy to show bootstrap alerts with different level using `SNGAlertService`.

### Usage

```html
<sng-alert context="general"></sng-alert>
```

```typescript
// Injecting SNGAlertService
constructor(private alertService: SNGAlertService) { }
...
showMessage() {
    // Display success message in 'general' alert
    this.alertService.success('Success message', 'general');
    // Adding visibility timeout to the alert in millis
    this.alertService.warning('Warning message', 'general', 1000);
}
...
clearMessage() {
    this.alertService.clear('general');
}
```

`context` is optional. If not provided, the alert service will notify the components with no context. Available levels are `success`, `warning`, `error`, `info`.

Alerts can be sticky, remains at the top of the viewport, if `sticky` flag is set to `true`. Also, more than one alert message can appear at the same time in the same SNGAlertComponent instance by setting `multi` to `true`.

```html
<sng-alert [sticky]="true" [multi]="true"></sng-alert>
```



### Configurations

SNGAlert component can be configured individually by passing `[config]` for alert configuration.

```html
<sng-alert [config]="{...}"></sng-alert>
```

#### Options

| Option             | Type    | Default | Description                                          |
| ------------------ | ------- | ------- | ---------------------------------------------------- |
| dismissable        | boolean | true    | Adds dismiss button on each alert                    |
| animation          | boolean | true    | Enables show/hide animation                          |
| style              | object  | ↓       | Object containing several options to style the table |
| style.stickyShadow | boolean | true    | Activates the shadow when alerts sticks at the top   |


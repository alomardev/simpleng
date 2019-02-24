# SimpleNG Library

[![npm version](https://badge.fury.io/js/simpleng.svg)](https://www.npmjs.com/package/simpleng)

SimpleNG is Angular library that contains simple and easy-to-use components. Bootstrap css classes are used in the UI; however, the customization is possible by using component-specific css classes.

### Available Components

- Table
- Pagination

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
      pagination: {...}
    }),
  ],
})
export class AppModule {}
```



## Table

SNGTable is a component that renders html table, with sorting and pagination user interface. Data should be passed manually instead of slicing and sorting them internally.

### Usage

```html
<sng-table [tableData]="tableData" (pageChange)="loadData($event)">
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

Initialize a TableData instance

```typescript
tableData: SNGTableData<any> = new SNGTableData();
```

Listen to the page changes. It will be called initially for the first page and the default page size with no sorting

```typescript
loadData(page: SNGTablePage) {
  this.dummyService.getPagedDummyData(
    page.pageNumber,
    page.pageSize,
    page.sortProp,
    page.sortDirection
  ).subscribe(data => {
    this.tableData.updateFromJpaPage(data);
  });
}
```

SNGTableData instance should be updated when after fetching new data. If the response is coming as JPA `Page` object, It will be updated just by calling `SNGTableData.updateFromJpaPage(page)`; call `SNGTableData.update(data: T[], pageNumber?: number, pageSize?: number, totalRecords?: number)` otherwise.

### Configurations

SNGTable component can be configured specifically by passing `[config]` for table configuration, and `[pagination]` for pagination configuration.

```html
<sng-table [config]="{...}" [pagination]="{...}">
  ...
</sng-table>
```

#### Table Configuration

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

#### Pagination Configuration

| Option          | Type     | Default            | Description                                                  |
| :-------------- | -------- | ------------------ | ------------------------------------------------------------ |
| zeroBased       | boolean  | true               | Page data will start from zero                               |
| pageSizes       | string[] | [10, 50, 100, 200] | Page size options to allow users picking one of them         |
| visiblePages    | number   | 5                  | Maximum number of pagination buttons that appears to the user |
| defaultPageSize | number   | 50                 | Default page size                                            |


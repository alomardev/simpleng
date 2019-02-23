# SimpleNG Library

SimpleNG is Angular library that contains several simple components. The aim is to provide simple, easy-to-use components that solve daily development problems.

Bootstrap css classes are used in the UI; however, the customization is possible by using component-specific css classes.

### Available Components

- Table
- Pagination

### Setup

1. Install via `npm`

   ```
   npm install simpleng
   ```

2. Import the module

   ```js
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

## Table

SNGTable provides a simple component to render html table sorting and pagination UI.

### Basic Usage

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

---

[License]: LICENSE


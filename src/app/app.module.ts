import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimpleNGModule } from 'projects/simpleng/src/public_api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SimpleNGModule.configure({
      table: {
        responsive: true,
        style: {
          headerTheme: 'default',
          tableStyle: 'bordered',
          striped: true
        }
      },
      pagination: {
        pageSizes: [1, 10, 20, 50, 100],
        defaultPageSize: 10,
        visiblePages: 3
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
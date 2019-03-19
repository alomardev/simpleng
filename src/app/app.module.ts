import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimpleNGModule } from 'projects/simpleng/src/public_api';
import { HttpClientModule } from '@angular/common/http';
import { AlertDemoComponent } from './alert-demo/alert-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertDemoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SimpleNGModule.configure({
      table: {
        responsive: true,
        style: {
          headerTheme: 'default',
          tableStyle: 'borderless',
          striped: false
        }
      },
      pagination: {
        zeroBased: true,
        pageSizes: [1, 10, 20, 50, 100],
        defaultPageSize: 20,
        visiblePages: 3
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

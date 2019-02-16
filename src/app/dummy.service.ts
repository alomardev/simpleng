import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from './models/jpa-page';

@Injectable({providedIn: 'root'})

export class DummyService {

  private readonly dummyUrl = `assets/dummy.json`;

  constructor(private http: HttpClient) {}

  getPagedDummy(pageNumber: number, pageSize: number, sortProp: string, sortDirection: SortDirection): Observable<Page<any[]>> {
    return this.http.get<any[]>(this.dummyUrl).pipe(
      map((data: any[]) => {
        if (sortProp) {
          data.sort((a: any, b: any) => {
            if (sortDirection == 'DESC') {
              let t = b; b = a; a = t;
            }
            if (a[sortProp] > b[sortProp]) {
              return 1;
            }
            if (a[sortProp] < b[sortProp]) {
              return -1;
            }
            return 0;
          });
        }
        let len = data.length;
        let start = pageSize * (pageNumber - 1);
        let slice = data.splice(start, pageSize);
        let page: Page<any> = {
          content: slice,
          number: pageNumber,
          size: pageSize,
          totalElements: len
        }
        return page;
      })
    )
  }

}

type SortDirection = 'ASC' | 'DESC';
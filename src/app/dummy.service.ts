import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageResult } from 'projects/simpleng/src/public_api';

@Injectable({providedIn: 'root'})
export class DummyService {

  private readonly dummyUrl = `assets/dummy.json`;

  constructor(private http: HttpClient) {}

  getPagedDummyData(pageNumber: number, pageSize: number, sortProp: string, sortDirection: SortDirection): Observable<PageResult<any[]>> {
    return this.http.get<any[]>(this.dummyUrl).pipe(
      map((data: any[]) => {
        if (sortProp) {
          data.sort((a: any, b: any) => {
            if (sortDirection === 'DESC') {
              const t = b; b = a; a = t;
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
        const len = data.length;
        const start = pageSize * pageNumber;
        const slice = data.splice(start, pageSize);
        const page: PageResult<any> = {
          content: slice,
          number: pageNumber,
          size: pageSize,
          totalElements: len
        };
        return page;
      })
    );
  }

}

type SortDirection = 'ASC' | 'DESC';

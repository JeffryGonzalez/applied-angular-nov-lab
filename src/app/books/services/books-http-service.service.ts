import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class BooksHttpService {
  _http = inject(HttpClient);

  // that I can use to load the data from the api, and give it to my store somehow
  /// the store needs BankTransactions

  getBooks() {
    return this._http
      .get<{
        data: { id: string; title: string; author: string; year: number }[];
      }>('/api/books')
      .pipe(map((res) => res.data));
  }
}

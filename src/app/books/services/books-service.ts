import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../types';
import { map } from 'rxjs';

@Injectable()
export class BooksService {
  #http = inject(HttpClient);

  getBooks() {
    return this.#http
      .get<{
        data: Book[];
      }>('/api/books')
      .pipe(map((m) => m.data));
  }
}

import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { BooksListStore } from '../services/book-store';

@Component({
    selector: 'app-book-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>id</th>
              <th>title</th>
              <th>author</th>
              <th>year</th>
            </tr>
          </thead>
          <tbody>
            @for (book of Books(); track book.id) {
              <tr>
                <td>{{ book.id }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.year }}</td>
              </tr>
            }
          </tbody>
        </table>
    `,
    styles: ``
})
export class BookListComponent {
  _booksService = inject(BooksListStore);
  Books = this._booksService.getBooksRespectingPrefs;
}
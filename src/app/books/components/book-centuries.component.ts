import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { BooksListStore } from '../services/book-store';

@Component({
  selector: 'app-book-centuries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <table>
      <thead>
        <tr>
          <th>Century</th>
          <th>Number of Books</th>
        </tr>
      </thead>
      <tbody>
        @for (bookBucket of bookBuckets(); track bookBucket.century) {
          <tr>
            <th>{{ bookBucket.century }}</th>
            <th>{{ bookBucket.count }}</th>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class BookCenturiesComponent {
  _booksService = inject(BooksListStore);
  bookBuckets = this._booksService.getBookBuckets;
}
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
} from '@angular/core';
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
        @for (book of books(); track book.id) {
          <tr>
            <td></td>
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.year }}</td>
          </tr>
        }
      </tbody>
    </table>
    <div class="join">
      @for(i of this._booksService.getMaxPagesFiltered(); track i){
        <button class="join-item btn" (click)="this._booksService.setCurrentPage(i)" [disabled]="this._booksService.currentPage() === i">{{i}}</button>
      }
    </div>
  `,
  styles: ``,
})
export class BookListComponent {
  _booksService = inject(BooksListStore);
  books = this._booksService.getFilteredBooksFromPage;
}

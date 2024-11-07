import { JsonPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { BookCenturiesComponent } from './components/book-centuries.component';
import { BookListComponent } from './components/book-list.component';
import { BooksHttpService } from './services/books-http-service.service';
import { BooksDisplayDefaultComponent } from './pages/books-display-default-component';
import { BooksListStore } from './services/book-store';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    JsonPipe,
    BookCenturiesComponent,
    BookListComponent,
    BooksDisplayDefaultComponent,
  ],
  template: `
    <div class="overflow-x-auto">
      <app-prefs />
      <app-book-centuries [BookBuckets]="bookBuckets()" />
      <app-book-list [Books]="books()!" />
    </div>
  `,
  styles: ``,
})
export class BooksComponent {
  _booksService = inject(BooksListStore);
  books = this._booksService.getBooksRespectingPrefs;

  bookBuckets = this._booksService.getBookBuckets;
}

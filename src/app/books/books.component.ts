import { JsonPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { BookCenturiesComponent } from './components/book-centuries.component';
import { BookListComponent } from './components/book-list.component';
import { BooksHttpService } from './services/books-http-service.service';
import { BooksDisplayComponent } from './pages/books-display-component';
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
    BooksDisplayComponent,
    RouterLink,
  ],
  template: `
    <div class="overflow-x-auto">
      <a routerLink="bookslist" class="btn btn-primary">books list with pagination</a>
      <a routerLink="bookscentury" class="btn btn-primary">century list</a>
      <br>
      <router-outlet />
      <!-- <app-book-centuries [BookBuckets]="bookBuckets()" />
      <app-book-list [Books]="books()!" /> -->
    </div>
  `,
  styles: ``,
})
export class BooksComponent {
  _booksService = inject(BooksListStore);
  books = this._booksService.getBooksRespectingPrefs;
  bookBuckets = this._booksService.getBookBuckets;
}

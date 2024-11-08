import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksListStore } from '../services/book-store';
import { BookPrefsComponent } from "../components/book-prefs.component";
import { BookListComponent } from "../components/book-list.component";
import { BookFilterComponent } from "../components/book-filter-component";

@Component({
  selector: 'app-prefs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookPrefsComponent, BookListComponent, BookFilterComponent],
  template: `
    <app-book-prefs/>
    <app-book-filter/>
    <app-book-list/>
  `,
  styles: ``,
})
export class BooksDisplayComponent {
  store = inject(BooksListStore);
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BooksByCenturyComponent } from './components/books-by-century.component';
import { BooksTableComponent } from './components/books-table.component';
import { BooksStore } from './services/books.store';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BooksTableComponent, BooksByCenturyComponent],
  template: `
    <app-books-table [books]="store.currentPage()" />

    <app-books-by-century [books]="store.entities()" />
  `,

  styles: ``,
})
export class BooksComponent {
  store = inject(BooksStore);
}

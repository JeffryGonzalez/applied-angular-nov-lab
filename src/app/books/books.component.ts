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
    <div class="flex gap-8">
      <div class="col-span-1">
        <app-books-table [books]="store.currentPage()" />
      </div>
      <div class="col-span-1">
        <app-books-by-century [books]="store.entities()" />
      </div>
    </div>
  `,

  styles: ``,
})
export class BooksComponent {
  store = inject(BooksStore);
}

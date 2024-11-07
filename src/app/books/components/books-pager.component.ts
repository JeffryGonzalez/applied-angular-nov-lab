import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-books-pager',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      @for (page of store.pages(); track page) {
        @if (page === store.onPage()) {
          <button class="join-item btn btn-md btn-active">{{ page }}</button>
        } @else {
          <button
            (click)="store.setCurrentPage(page)"
            class="join-item btn btn-md"
          >
            {{ page }}
          </button>
        }
      }
    </div>
  `,
  styles: ``,
})
export class BooksPagerComponent {
  store = inject(BooksStore);
}

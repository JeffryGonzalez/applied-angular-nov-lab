import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksStore } from '../services/books.store';

@Component({
  selector: 'app-books-page-size',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      <button
        [disabled]="store.pageSize() === 5"
        (click)="store.setPageSize(5)"
        class="btn join-item"
      >
        5 Books Per Page
      </button>
      <button
        [disabled]="store.pageSize() === 10"
        (click)="store.setPageSize(10)"
        class="btn join-item"
      >
        10 Books Per Page
      </button>
      <button
        [disabled]="store.pageSize() === 25"
        (click)="store.setPageSize(25)"
        class="btn join-item"
      >
        25 Books Per Page
      </button>
      <button
        [disabled]="store.pageSize() === 0"
        (click)="store.setPageSize(0)"
        class="btn join-item"
      >
        All Books At Once
      </button>
    </div>
  `,
  styles: ``,
})
export class PageSizeComponent {
  store = inject(BooksStore);
}

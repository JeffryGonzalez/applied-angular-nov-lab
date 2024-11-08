import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksListStore } from '../services/book-store';

@Component({
    selector: 'app-book-prefs',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <p>
      pick a default book list page limit, the current limit is
      {{ store.booksPerPage() }}
    </p>
    <div class="join">
      <button
        (click)="store.setBooksPerPage(5)"
        [disabled]="store.booksPerPage() === 5"
        class="btn join-item"
      >
        5
      </button>
      <button
        (click)="store.setBooksPerPage(10)"
        [disabled]="store.booksPerPage() === 10"
        class="btn join-item"
      >
        10
      </button>
      <button
        (click)="store.setBooksPerPage(25)"
        [disabled]="store.booksPerPage() === 25"
        class="btn join-item"
      >
        25
      </button>
      <!--  TODO: all-->
    </div>
    `,
    styles: ``
})
export class BookPrefsComponent {
    store = inject(BooksListStore);
}
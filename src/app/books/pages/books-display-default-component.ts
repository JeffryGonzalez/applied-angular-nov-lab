import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksListStore } from '../services/book-store';

@Component({
  selector: 'app-prefs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
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
  styles: ``,
})
export class BooksDisplayDefaultComponent {
  store = inject(BooksListStore);
}

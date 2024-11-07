import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Signal,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Book } from './types';
import { BooksTableComponent } from './components/books-table.component';
import { BooksByCenturyComponent } from './components/books-by-century.component';
import { BooksService } from './services/books-service';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, BooksTableComponent, BooksByCenturyComponent],
  template: `
    <app-books-table [books]="books() || []" />

    <app-books-by-century [books]="books() || []" />
  `,

  styles: ``,
})
export class BooksComponent {
  #service = inject(BooksService);

  books = toSignal(this.#service.getBooks());

  // a computed value that breaks down the number of books by century
}

// a function that returns the century from the year

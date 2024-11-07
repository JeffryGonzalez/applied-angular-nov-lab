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

type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
};
@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `<div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          @for (book of books(); track book.id) {
            <tr>
              <th>{{ book.id }}</th>
              <td>{{ book.author }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
          <!-- row 2 -->
        </tbody>
      </table>
    </div>

    <table class="table table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th>Century</th>
          <th>Number of Books</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        @for (book of booksByCentury(); track book[0]) {
          <tr>
            <td>{{ book[0] }}</td>
            <td>{{ book[1] }}</td>
          </tr>
        }
        <!-- row 2 -->
      </tbody>
    </table> `,

  styles: ``,
})
export class BooksComponent {
  #http = inject(HttpClient);

  books = toSignal(
    this.#http
      .get<{
        data: Book[];
      }>('/api/books')
      .pipe(map((m) => m.data)),
  );

  booksByCentury = computed(() => {
    const result = new Map<string, number>([]);

    this.books()?.forEach((b) => {
      const c = getCenturyFrom(b.year);
      console.log(c);
      if (result.has(c)) {
        const count = result.get(c);
        result.set(c, count! + 1);
      } else {
        result.set(c, 1);
      }
    });
    return Array.from(result.entries()).sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
  });
}

// a function that returns the century from the year
function getCenturyFrom(year: number): string {
  if (year < 0) {
    return `${Math.ceil(Math.abs(year) / 100)} BC`;
  } else {
    return `${Math.ceil(year / 100)} AD`;
  }
}

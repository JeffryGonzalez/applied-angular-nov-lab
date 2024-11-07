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

type CenturyItem = {
  centuryText: string;
  century: number;
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
    <pre> {{ booksByCentury() | json }}</pre> `,

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

  // a computed value that breaks down the number of books by century
  booksByCentury = computed(() => {
    const books = this.books() || [];
    const centuryMap = new Map<string, number>();

    books.forEach((book) => {
      const century = getCenturyFrom(book.year);
      centuryMap.set(century, (centuryMap.get(century) || 0) + 1);
    });

    const all = Array.from(centuryMap.entries()).map(([century, count]) => ({
      century,
      count,
    }));
    return all.sort((a, b) => {
      const getCenturyValue = (century: string): number => {
        const [value, era] = century.split(' ');
        const numValue = parseInt(value, 10);
        return era === 'BC' ? -numValue : numValue;
      };
      return getCenturyValue(a.century) - getCenturyValue(b.century);
      // sort this array by century
    });
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

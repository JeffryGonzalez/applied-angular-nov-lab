import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import { Book } from '../types';

@Component({
  selector: 'app-books-by-century',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th>Century</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          @for (book of booksByCentury(); track book.century) {
            <tr>
              <td>{{ book.century }}</td>
              <td>{{ book.count }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class BooksByCenturyComponent {
  books = input.required<Book[]>();

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
    });
  });
}

function getCenturyFrom(year: number): string {
  if (year < 0) {
    return `${Math.ceil(Math.abs(year) / 100)} BC`;
  } else {
    return `${Math.ceil(year / 100)} AD`;
  }
}

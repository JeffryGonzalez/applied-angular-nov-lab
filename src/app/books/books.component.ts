import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Signal,
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
  </div> `,
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
}

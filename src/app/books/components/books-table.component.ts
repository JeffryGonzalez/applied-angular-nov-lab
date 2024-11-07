import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Book } from '../types';
import { PageSizeComponent } from './page-size-component';
import { BooksPagerComponent } from './books-pager.component';

@Component({
  selector: 'app-books-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageSizeComponent, BooksPagerComponent],
  template: ` <app-books-page-size />
    <div>
      <app-books-pager />
    </div>

    <div class="overflow-x-auto">
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
    </div>`,
  styles: ``,
})
export class BooksTableComponent {
  books = input.required<Book[]>();
}

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'app-book-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>id</th>
              <th>title</th>
              <th>author</th>
              <th>year</th>
            </tr>
          </thead>
          <tbody>
            @for (book of Books; track book.id) {
              <tr>
                <td>{{ book.id }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.year }}</td>
              </tr>
            }
          </tbody>
        </table>
    `,
    styles: ``
})
export class BookListComponent {
    @Input() Books: { id: string; title: string; author: string; year: number }[] = [];
}
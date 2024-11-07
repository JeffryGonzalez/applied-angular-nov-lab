import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, JsonPipe],
  template: `
    <div class="overflow-x-auto">
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
      @for(book of books(); track book.id){
        <tr>
        <td>{{book.id}}</td>
        <td>{{book.title}}</td>
        <td>{{book.author}}</td>
        <td>{{book.year}}</td>
      </tr>
      
      }
    </tbody>
  </table>
</div>
  `,
  styles: ``,
})
export class BooksComponent {
  _http = inject(HttpClient);
  books = toSignal(
    this._http
      .get<{
        data: { id: string; title: string; author: string; year: number }[];
      }>('/api/books')
      .pipe(map((res) => res.data)),
  );
}

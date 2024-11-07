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
    <div class="flex gap-4 p-4">
      <!-- <div>books page</div> -->
      <!-- <br> -->
      <!-- <pre>
        {{ books() | json }}
</pre> -->
      
    <ul>
      @for(book of books(); track book.id) {
      <li>
        <pre>{{ book | json }}</pre>
      </li>
      }
    </ul>
    </div>
    <router-outlet />
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

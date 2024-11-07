import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: ` <pre>{{ books() | json }}</pre> `,
  styles: ``,
})
export class BooksComponent {
  #http = inject(HttpClient);

  books = toSignal(this.#http.get('/api/books'));
}

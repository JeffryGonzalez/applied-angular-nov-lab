import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { first, map } from 'rxjs';
import { BookCenturiesComponent } from "./components/book-centuries.component";
import { BookListComponent } from "./components/book-list.component";

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, JsonPipe, BookCenturiesComponent, BookListComponent],
  template: `
    <div class="overflow-x-auto">
        <app-book-centuries [BookBuckets]=bookBuckets()/>
        <app-book-list [Books]=books()! />
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
  

  bookBuckets = computed(() => {
    // lazy typescript type coalescing

    const earliest = this.books()?.flatMap((b) => b.year).sort()[0] ?? 0;
    const latestYear = this.books()?.flatMap((b) => b.year).sort().reverse()[0] ?? 0;

    const result: BookBucketItem[] = [];
    for (let i = +earliest/100; i <= latestYear/100; i++) {
      result.push({ century: ~~i + '00', count: 0 });
    }
    //console.log(result);

    this.books()?.forEach((book) => {
      // lazy typescript type coalescing
      const bucket = ~~(book.year/100) + '00';
      //console.log(bucket);
      result.find(bookBucket => bookBucket.century == bucket)!.count++;
    });
    return result;
  });
}

export type BookBucketItem = {
  century: string;
  count: number;
};

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BookBucketItem } from '../books.component';

@Component({
  selector: 'app-book-centuries',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <table>
      <thead>
        <tr>
          <th>Century</th>
          <th>Number of Books</th>
        </tr>
      </thead>
      <tbody>
        @for (bookBucket of BookBuckets; track bookBucket.century) {
          <tr>
            <th>{{ bookBucket.century }}</th>
            <th>{{ bookBucket.count }}</th>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class BookCenturiesComponent {
    @Input() BookBuckets: BookBucketItem[] = [];
}

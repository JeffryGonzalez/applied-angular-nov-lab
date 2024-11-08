import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BooksListStore } from '../services/book-store';

@Component({
  selector: 'app-book-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submitData()">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Filters</span>
        </div>
        <label
          >Author Filter
          <input
            formControlName="author"
            type="string"
            placeholder=""
            class="input input-bordered w-full max-w-xs"
          />
        </label>
        <label
          >Title Filter
          <input
            formControlName="title"
            type="string"
            placeholder=""
            class="input input-bordered w-full max-w-xs"
          />
        </label>
      </label>
      <button type="submit" class="btn btn-primary">Apply Filter</button>
    </form>
    <div>
      <p>current author filter: {{ store.authorFilter() }}</p>
      <p>current title filter: {{ store.titleFilter() }}</p>
    </div>
  `,
  styles: ``,
})
export class BookFilterComponent {
  form = new FormGroup({
    author: new FormControl<string | null>(''),
    title: new FormControl<string | null>(''),
  });

  store = inject(BooksListStore);

  submitData() {
    const author = this.form.controls.author.value!;
    const title = this.form.controls.title.value!;
    this.store.setAuthorFilter(author);
    this.store.setTitleFilter(title);
    this.form.reset();
  }
}

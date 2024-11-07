import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductsStore } from './products.store';

@Component({
  selector: 'app-blah',
  standalone: true,

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, AsyncPipe, JsonPipe],

  template: `
    <p>Demos Go Here</p>
    <div>
      <pre>{{ store.product() | json }}</pre>
    </div>
  `,
  styles: ``,
})
export class DemosComponent implements OnInit {
  store = inject(ProductsStore);
  id = input.required<string>(); // this should be the thing after the final slash when you go to /demo/398398

  ngOnInit(): void {
    this.store.getProduct(this.id());
  }
}

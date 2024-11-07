import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-4 p-4">
      <a class="link" routerLink="ui">UI</a>
      <a class="link" routerLink="prefs">Prefs</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class BooksComponent {}

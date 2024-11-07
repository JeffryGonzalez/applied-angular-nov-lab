import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeatureDirective } from '@shared';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FeatureDirective, RouterLinkActive],
  template: `
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" routerLink="/">Applied Angular</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li *feature="'wip'" [routerLinkActive]="['underline']">
            <a routerLink="demos">Demos</a>
          </li>
          <li *feature="'books'" [routerLinkActive]="['underline']">
            <a routerLink="books">Books</a>
          </li>
          <li>
            <a [routerLinkActive]="['underline']" routerLink="banking"
              >Banking</a
            >
          </li>
          <li>
            <a [routerLinkActive]="['underline']" routerLink="counter"
              >Counter</a
            >
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavBarComponent {}

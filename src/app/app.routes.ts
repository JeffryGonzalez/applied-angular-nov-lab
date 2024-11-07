import { Routes } from '@angular/router';
import { canMatchFeature } from '@shared';

export const routes: Routes = [
  // whatever routes i need at the application level
  {
    path: 'demos',
    canMatch: [canMatchFeature('wip')],
    loadChildren: () =>
      import('./demos/demos.routes').then((d) => d.DEMOS_ROUTES),
  },
  {
    path: 'banking',
    loadChildren: () =>
      import('./banking/banking.routes').then((b) => b.BANKING_ROUTES),
  },
  {
    path: 'counter',
    canMatch: [canMatchFeature('counter-redux')],
    loadChildren: () =>
      import('./counter-upgrade/counter-upgrade.routes').then(
        (r) => r.COUNTER_UPGRADE_ROUTES,
      ),
  },
  {
    path: 'counter',
    loadChildren: () =>
      import('./counter/counter.routes').then((r) => r.COUNTER_ROUTES),
  },
  {
    path: 'books',
    canMatch: [canMatchFeature('books')],
    loadChildren: () => 
      import('./books/books.routes').then((r) => r.BOOKS_ROUTES),
  },
];

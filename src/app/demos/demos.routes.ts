import { Routes } from '@angular/router';
import { ChangeDetectionComponent } from './components/change-detection.component';
import { DemosComponent } from './demos.component';
import { ProductsService } from './products.service';
import { ProductsStore } from './products.store';

export const DEMOS_ROUTES: Routes = [
  {
    path: ':id', // demos
    component: DemosComponent,
    providers: [ProductsService, ProductsStore],

    children: [
      {
        path: 'change-detection', // demos/change-detection
        component: ChangeDetectionComponent,
      },
    ],
  },
];

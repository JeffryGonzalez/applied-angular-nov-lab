import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksService } from './services/books-service';
import { BooksStore } from './services/books.store';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    providers: [BooksService, BooksStore],
    component: BooksComponent,
  },
];

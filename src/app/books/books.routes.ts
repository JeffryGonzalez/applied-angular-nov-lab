import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksHttpService } from './services/books-http-service.service';
import { BooksDisplayDefaultComponent } from './pages/books-display-default-component';
import { BooksListStore } from './services/book-store';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [BooksHttpService, BooksListStore],
    children:[
        {
            path: 'prefs',
            component: BooksDisplayDefaultComponent,
        }
    ]
  },
];

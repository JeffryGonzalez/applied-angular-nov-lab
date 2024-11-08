import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksHttpService } from './services/books-http-service.service';
import { BooksDisplayComponent } from './pages/books-display-component';
import { BooksListStore } from './services/book-store';
import { BookCenturiesComponent } from './components/book-centuries.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [BooksHttpService, BooksListStore],
    children:[
        {
            path: 'bookslist',
            component: BooksDisplayComponent,
        },
        {
            path: 'bookscentury',
            component: BookCenturiesComponent,
        }
    ]
  },
];

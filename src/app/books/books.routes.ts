import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksHttpService } from './services/books-http-service.service';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    providers: [BooksHttpService],
    children:[
    ]
  },
];

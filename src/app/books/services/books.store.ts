import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { Book } from '../types';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { BooksService } from './books-service';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';

export const BooksStore = signalStore(
  withEntities<Book>(),
  withMethods((store) => {
    const service = inject(BooksService);
    return {
      _load: rxMethod<void>(
        switchMap(() =>
          service.getBooks().pipe(
            tapResponse({
              next(value) {
                patchState(store, setEntities(value));
              },
              error(error) {
                console.log(error);
              },
            }),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);

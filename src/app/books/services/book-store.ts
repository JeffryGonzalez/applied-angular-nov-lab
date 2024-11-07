import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { BookData, BooksHttpService } from './books-http-service.service';

type BookListState = {
  booksPerPage: number;
  currentPage: number;
  books: BookData[];
};

const initialState: BookListState = {
  booksPerPage: 50,
  currentPage: 0,
  books: [],
};

type BookBucketItem = {
  century: string;
  count: number;
};

export const BooksListStore = signalStore(
  withState<BookListState>(initialState),
  withMethods((store) => {
    return {
      setBooksPerPage: (amount: number) =>
        patchState(store, { booksPerPage: amount }),
      setCurrentPage: (amount: number) =>
        patchState(store, { currentPage: amount }),
    };
  }),
  withComputed((store) => ({
    getBooksRespectingPrefs: computed(() =>
      store.books().slice(0,store.booksPerPage()),
    ),
    getBookBuckets: computed(() => {
      // lazy typescript type coalescing

      const earliest =
        store
          .books()
          ?.flatMap((b) => b.year)
          .sort()[0] ?? 0;
      const latestYear =
        store
          .books()
          ?.flatMap((b) => b.year)
          .sort()
          .reverse()[0] ?? 0;

      const result: BookBucketItem[] = [];
      for (let i = +earliest / 100; i <= latestYear / 100; i++) {
        result.push({ century: ~~i + '00', count: 0 });
      }
      //console.log(result);

      store.books()?.forEach((book) => {
        // lazy typescript type coalescing
        const bucket = ~~(book.year / 100) + '00';
        //console.log(bucket);
        result.find((bookBucket) => bookBucket.century == bucket)!.count++;
      });
      return result;
    }),
  })),
  withHooks({
    onInit(store) {
      const service = inject(BooksHttpService);
      console.log('init ran');

      // bad
      service.getBooks().subscribe((b) => {
        patchState(store, { books: b });
        console.log('ran a thing');
      });
    },
  }),
);

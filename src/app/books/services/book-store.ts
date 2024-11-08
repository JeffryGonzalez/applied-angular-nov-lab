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
  filteredBooks: BookData[];
  authorFilter: string;
  titleFilter: string;
};

const initialState: BookListState = {
  booksPerPage: 50,
  currentPage: 1,
  books: [],
  filteredBooks: [],
  authorFilter: '',
  titleFilter: '',
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
        patchState(store, { booksPerPage: amount, currentPage: 1 }),
      setCurrentPage: (amount: number) =>
        patchState(store, { currentPage: amount }),
      setAuthorFilter: (author: string) => {
        patchState(store, { authorFilter: author });
        patchState(store, {
          filteredBooks: filterBooks(
            store.books(),
            store.authorFilter(),
            store.titleFilter(),
          ),
        });
      },
      setTitleFilter: (title: string) => {
        patchState(store, { titleFilter: title });
        patchState(store, {
          filteredBooks: filterBooks(
            store.books(),
            store.authorFilter(),
            store.titleFilter(),
          ),
        });
      },
    };
  }),
  withComputed((store) => ({
    // these should probably be methods not computed
    getBooks: computed(() => store.books()),
    getBooksRespectingPrefs: computed(() =>
      store.books().slice(0, store.booksPerPage()),
    ),
    getBooksFromPage: computed(() => {
      const start = (store.currentPage() - 1) * store.booksPerPage();
      const end = start + store.booksPerPage();
      return store.books().slice(start, end);
    }),
    getFilteredBooksFromPage: computed(() => {
      const start = (store.currentPage() - 1) * store.booksPerPage();
      const end = start + store.booksPerPage();
      return store.filteredBooks().slice(start, end);
    }),
    getMaxPages: computed(() => {
      // if 4 pages, return [1,2,3,4] this function is badly named
      return [
        ...Array(
          Math.ceil(store.books().length / store.booksPerPage()) + 1,
        ).keys(),
      ].slice(1);
    }),
    getMaxPagesFiltered: computed(() => {
      // if 4 pages, return [1,2,3,4] this function is badly named
      return [
        ...Array(
          Math.ceil(store.filteredBooks().length / store.booksPerPage()) + 1,
        ).keys(),
      ].slice(1);
    }),
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
      //console.log('init ran');

      // bad
      service.getBooks().subscribe((b) => {
        patchState(store, { books: b, filteredBooks: b });
        //console.log('loaded',store.books(), store.filteredBooks());
      });
    },
  }),
);

function filterBooks(
  bda: BookData[],
  authorFilter: string,
  titleFilter: string,
) {
  let resultSet = bda;
  //console.log(resultSet);
  if (authorFilter) {
    resultSet = resultSet.filter((bls) => bls.author.toLowerCase().indexOf(authorFilter) >= 0);
    //console.log("ran author filter on " + authorFilter);
    //console.log(resultSet);

  }
  if (titleFilter) {
    resultSet = resultSet.filter((bls) => bls.title.toLowerCase().indexOf(titleFilter) >= 0);
    //console.log("ran title filter on " + titleFilter);
    //console.log(resultSet);
  }
  return resultSet;
}

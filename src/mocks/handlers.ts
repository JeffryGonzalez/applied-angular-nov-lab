import fakeBankApi from './bank-handler';
import featureHandlers from './features-handler';
import booksHandlers from './books-handler';
import productsHandler from './products-handler';

export const handlers = [
  ...productsHandler,
  ...fakeBankApi,
  ...featureHandlers,
  ...booksHandlers,
];

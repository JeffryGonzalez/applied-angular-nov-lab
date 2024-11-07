import fakeBankApi from './bank-handler';
import featureHandlers from './features-handler';
import booksHandlers from './books-handler';

export const handlers = [...fakeBankApi, ...featureHandlers, ...booksHandlers];

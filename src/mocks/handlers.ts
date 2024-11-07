import fakeBankApi from './bank-handler';
import featureHandlers from './features-handler';
import booksHandlers from './bank-handler';

export const handlers = [...fakeBankApi, ...featureHandlers, ...booksHandlers];

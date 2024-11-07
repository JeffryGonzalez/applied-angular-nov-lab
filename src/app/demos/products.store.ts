import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { ProductsService } from './products.service';
import { Product } from './types';
type ProductState = {
  product: Product | undefined;
  cachedProducts: { id: string; time: number }[];
};
export const ProductsStore = signalStore(
  withState<ProductState>({
    product: undefined,
    cachedProducts: [],
  }),
  withEntities<Product>(),
  withDevtools('products'),
  withMethods((store) => {
    const service = inject(ProductsService);
    return {
      getProduct: rxMethod<string>(
        pipe(
          switchMap((id) =>
            service.getProductById(id).pipe(
              tapResponse({
                next(value) {
                  patchState(store, { product: value }, addEntity(value));
                },
                error(value) {
                  console.log(value);
                  // send an api call to the support people to log this so we can figure out what is going wrong.
                },
              }),
            ),
          ),
        ),
      ),
    };
  }),
);

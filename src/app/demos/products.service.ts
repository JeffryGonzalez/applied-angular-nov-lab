import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { ProductSchema, Product } from './types';

@Injectable()
export class ProductsService {
  #http = inject(HttpClient);

  // getProductById(id: string) {
  //   return this.#http.get<Product>(`/api/products/${id}`).pipe(
  //     map((p) => {
  //       const response: Product = {
  //         id: p.id,
  //         description: p.description,
  //         price: p.price,
  //       };
  //       return response;
  //     }),
  //   );
  // }

  getProductById(id: string) {
    return this.#http
      .get<Product>(`/api/products/${id}`)
      .pipe(map((r) => ProductSchema.parse(r)));
  }
}

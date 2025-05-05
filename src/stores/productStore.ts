import { Product } from '@/pages/Products';
import { BehaviorSubject } from 'rxjs';

const _productsList$ = new BehaviorSubject<Product[] | []>([]);

export const productListStore = {
  subscribe: _productsList$.asObservable().subscribe.bind(_productsList$),
  set: (data: Product[]) => _productsList$.next(data),
  get: () => _productsList$.getValue(),
};

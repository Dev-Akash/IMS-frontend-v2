import { Warehouse } from '@/pages/Products';
import { BehaviorSubject } from 'rxjs';

const _warehouseList$ = new BehaviorSubject<Warehouse[] | []>([]);

export const warehouseListStore = {
  subscribe: _warehouseList$.asObservable().subscribe.bind(_warehouseList$),
  set: (data: Warehouse[]) => _warehouseList$.next(data),
  get: () => _warehouseList$.getValue(),
};

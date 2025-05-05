import { Category } from '@/pages/Categories';
import { BehaviorSubject } from 'rxjs';

const _categoriesList$ = new BehaviorSubject<Category[] | []>([]);

export const categoryListStore = {
  subscribe: _categoriesList$.asObservable().subscribe.bind(_categoriesList$),
  set: (data: Category[]) => _categoriesList$.next(data),
  get: () => _categoriesList$.getValue(),
};

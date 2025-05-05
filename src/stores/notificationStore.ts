import { Notifications } from '@/pages/Notifications';
import { BehaviorSubject } from 'rxjs';

const _notificationsList$ = new BehaviorSubject<Notifications[] | []>([]);

export const notificationListStore = {
  subscribe: _notificationsList$.asObservable().subscribe.bind(_notificationsList$),
  set: (data: Notifications[]) => _notificationsList$.next(data),
  get: () => _notificationsList$.getValue(),
};

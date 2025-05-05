
import { notificationListStore } from '@/stores/notificationStore';
import { useEffect, useState } from 'react';

export const useNotificationListStore = () => {
  const [notificationList, setNotificationList] = useState(notificationListStore.get());

  useEffect(() => {
    const subscription = notificationListStore.subscribe(setNotificationList);
    return () => subscription.unsubscribe();
  }, []);

  return notificationList;
};

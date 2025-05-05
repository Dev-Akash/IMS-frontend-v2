import { warehouseListStore } from '@/stores/warehouseStore';
import { useEffect, useState } from 'react';

export const useWarehouseListStore = () => {
  const [warehouseList, setWarehouseList] = useState(warehouseListStore.get());

  useEffect(() => {
    const subscription = warehouseListStore.subscribe(setWarehouseList);
    return () => subscription.unsubscribe();
  }, []);

  return warehouseList;
};

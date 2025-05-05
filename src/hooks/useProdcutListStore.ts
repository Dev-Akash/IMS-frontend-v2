import { productListStore } from '@/stores/productStore';
import { useEffect, useState } from 'react';

export const useProductListStore = () => {
  const [productList, setProductList] = useState(productListStore.get());

  useEffect(() => {
    const subscription = productListStore.subscribe(setProductList);
    return () => subscription.unsubscribe();
  }, []);

  return productList;
};

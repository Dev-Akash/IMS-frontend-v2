import { categoryListStore } from '@/stores/categoryStore';
import { useEffect, useState } from 'react';

export const useCategoryListStore = () => {
  const [categoriesList, setCategoriesList] = useState(categoryListStore.get());

  useEffect(() => {
    const subscription = categoryListStore.subscribe(setCategoriesList);
    return () => subscription.unsubscribe();
  }, []);

  return categoriesList;
};

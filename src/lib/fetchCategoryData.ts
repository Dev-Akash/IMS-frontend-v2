import { listCategories } from "@/api/categories"
import { Category } from "@/pages/Categories";
import { categoryListStore } from "@/stores/categoryStore";
import { toast } from "sonner";

export const fetchCategoryData = async () => {
    listCategories(1, 10000).then((data) => {
        if (data.error) {
            toast.error("Error fetching categories", { description: data.error })
        } else {
            categoryListStore.set(data.categories as Category[])
        }
    }).catch((error) => {
        toast.error("Error fetching categories", { description: error.message })
    });
}
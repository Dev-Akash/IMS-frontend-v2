import { listProducts } from "@/api/products";
import { Product } from "@/pages/Products";
import { productListStore } from "@/stores/productStore";
import { toast } from "sonner";

export const fetchProductData = async () => {
    listProducts(1, 10000).then((data) => {
        if (data.error) {
            toast.error("Error fetching products", { description: data.error })
        } else {
            productListStore.set(data.products as Product[])
        }
    }).catch((error) => {
        toast.error("Error fetching products", { description: error.message })
    });
}
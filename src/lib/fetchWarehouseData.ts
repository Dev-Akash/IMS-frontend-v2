import { listWarehouses } from "@/api/warehouse";
import { Warehouse } from "@/pages/Products";
import { warehouseListStore } from "@/stores/warehouseStore";
import { toast } from "sonner";

export const fetchWarehouseData = async () => {
    listWarehouses(1, 10000).then((data) => {
        if (data.error) {
            toast.error("Error fetching Warehouses", { description: data.error })
        } else {
            warehouseListStore.set(data as Warehouse[])
        }
    }).catch((error) => {
        toast.error("Error fetching Warehouses", { description: error.message })
    });
}
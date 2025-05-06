import { API_URL } from "@/config";
import { Warehouse } from "@/pages/Products";

export const listWarehouses = async (page: number, limit: number) => {
    return await fetch(`${API_URL}/warehouse/list?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error("Error fetching warehouses:", error)
    });
}

export const createWarehouse = async (warehouse: Warehouse, userId: string, token: string) => {
    return await fetch(`${API_URL}/warehouse/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(warehouse)
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err);
    })
}
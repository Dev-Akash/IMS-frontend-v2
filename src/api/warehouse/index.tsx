import { API_URL } from "@/config";

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
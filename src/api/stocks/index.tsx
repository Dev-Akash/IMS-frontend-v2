import { API_URL } from "@/config";
import { StockLog } from "@/pages/Stocks";

export const listStockLogs = async (page: number, limit: number) => {
    return await fetch(`${API_URL}/stock/logs?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json();
    }).catch((error) => {
        console.error("Error fetching stock logs:", error);
    });
};

export const updateStock = async (stock: StockLog, token: string) => {
    return await fetch(`${API_URL}/stock/update`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(stock)
    }).then((res) => {
        return res.json();
    }).catch((error) => {
        console.error("Error fetching stock logs:", error);
    });
}
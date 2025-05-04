import { API_URL } from "@/config";
import { Product } from "@/pages/Products";

export const listProducts = async (page: number, limit: number) => {
    return await fetch(`${API_URL}/product/list?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error("Error fetching products:", error)
    });
}

export const createProduct = async (product: Product, userId: string, token: string) => {
    return await fetch(`${API_URL}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product)
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err);
    })
}
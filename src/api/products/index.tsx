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

export const updateProduct = async (productId: string, product: Product, userId: string, token: string) => {
    return await fetch(`${API_URL}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.error("Error updating product:", err);
    });
};

export const deleteProduct = async (productId: string, userId: string, token: string) => {
    return await fetch(`${API_URL}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.error("Error deleting product:", err);
    });
};
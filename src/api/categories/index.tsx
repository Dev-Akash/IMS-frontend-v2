import { API_URL } from "@/config";

export const listCategories = async () => {
    return await fetch(`${API_URL}/category/list`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error("Error fetching categories:", error)
    });
}

export const createCategory = async (name: string, description: string, userId: string, token: string) => {
    return await fetch(`${API_URL}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error("Error creating category:", error)
    });
}
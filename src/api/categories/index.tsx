import { API_URL } from "@/config";

export const listCategories = async (page: number, limit: number) => {
    return await fetch(`${API_URL}/category/list?limit=${limit}&page=${page}`, {
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

export const updateCategory = async (categoryId: string, name: string, description: string, userId: string, token: string) => {
    return await fetch(`${API_URL}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error("Error updating category:", error)
    });
}

export const deleteCategory = async (categoryId: string, userId: string, token: string) => {
    return await fetch(`${API_URL}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error("Error deleting category:", error)
    });
}

export const getCategory = async (categoryId: string) => {
    return await fetch(`${API_URL}/category/${categoryId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error("Error fetching category:", error)
    });
}